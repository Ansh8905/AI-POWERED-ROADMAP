const { spawn } = require('node:child_process');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');

const services = [
  { name: 'server', cwd: path.join(rootDir, 'server') },
  { name: 'client', cwd: path.join(rootDir, 'client') }
];

const children = new Map();
let shuttingDown = false;

function pipeOutput(stream, prefix, target) {
  let buffered = '';

  stream.on('data', (chunk) => {
    buffered += chunk.toString();
    const lines = buffered.split(/\r?\n/);
    buffered = lines.pop() ?? '';

    for (const line of lines) {
      target.write(`${prefix}${line}\n`);
    }
  });

  stream.on('end', () => {
    if (buffered) {
      target.write(`${prefix}${buffered}\n`);
    }
  });
}

function stopAll(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children.values()) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => process.exit(exitCode), 150);
}

for (const service of services) {
  const command =
    process.platform === 'win32'
      ? {
          file: process.env.comspec || 'cmd.exe',
          args: ['/d', '/s', '/c', 'npm run dev']
        }
      : {
          file: 'npm',
          args: ['run', 'dev']
        };

  const child = spawn(command.file, command.args, {
    cwd: service.cwd,
    env: process.env,
    stdio: ['inherit', 'pipe', 'pipe']
  });

  children.set(service.name, child);

  pipeOutput(child.stdout, `[${service.name}] `, process.stdout);
  pipeOutput(child.stderr, `[${service.name}] `, process.stderr);

  child.on('exit', (code, signal) => {
    children.delete(service.name);

    if (shuttingDown) {
      return;
    }

    const detail = signal ? `signal ${signal}` : `code ${code ?? 0}`;
    process.stderr.write(`[${service.name}] exited with ${detail}\n`);
    stopAll(code ?? 1);
  });

  child.on('error', (error) => {
    process.stderr.write(`[${service.name}] failed to start: ${error.message}\n`);
    stopAll(1);
  });
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
