import json
import os
from typing import Dict, List, Optional

import requests
import streamlit as st


ROLE_SKILL_MAP = {
    "AI Engineer": ["Python", "Machine Learning", "Deep Learning", "MLOps", "LLM APIs", "Vector Databases"],
    "Data Scientist": ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization", "Experimentation"],
    "Frontend Developer": ["JavaScript", "React", "HTML", "CSS", "Testing", "Performance Optimization"],
    "Flutter Developer": ["Dart", "Flutter", "State Management", "REST APIs", "Firebase", "App Deployment"],
    "Government Exams": ["Current Affairs", "Polity", "History", "Geography", "Quantitative Aptitude", "Reasoning"],
    "Board Exams": ["NCERT mastery", "Concept clarity", "Formula retention", "Sample paper practice", "Answer writing", "Revision planning"],
    "Defence": ["Mathematics", "General Ability", "Current Affairs", "Physical Fitness", "SSB Interview", "Discipline"],
    "Commerce": ["Accountancy", "Business Studies", "Economics", "Financial Literacy", "Quantitative Skills", "Case Analysis"],
    "Management": ["Business Fundamentals", "Leadership", "Communication", "Quantitative Aptitude", "Strategy", "Problem Solving"],
}

TRACK_GROUPS = {
    "Tech Paths": ["AI Engineer", "Data Scientist", "Frontend Developer", "Flutter Developer"],
    "Non-Tech Paths": ["Government Exams", "Board Exams", "Defence", "Commerce", "Management"],
}

TRUSTED_SOURCES = {
    "AI Engineer": [
        {"title": "Python Tutorial", "provider": "Python Docs", "url": "https://docs.python.org/3/tutorial/"},
        {"title": "scikit-learn Getting Started", "provider": "scikit-learn", "url": "https://scikit-learn.org/stable/getting_started.html"},
        {"title": "Prompting Guide", "provider": "OpenAI", "url": "https://platform.openai.com/docs/guides/prompting"},
    ],
    "Data Scientist": [
        {"title": "Pandas Getting Started", "provider": "pandas", "url": "https://pandas.pydata.org/docs/getting_started/index.html"},
        {"title": "NumPy Quickstart", "provider": "NumPy", "url": "https://numpy.org/doc/stable/user/quickstart.html"},
        {"title": "PostgreSQL Tutorial", "provider": "PostgreSQL", "url": "https://www.postgresql.org/docs/current/tutorial-start.html"},
    ],
    "Frontend Developer": [
        {"title": "Learn Web Development", "provider": "MDN", "url": "https://developer.mozilla.org/en-US/docs/Learn"},
        {"title": "JavaScript Guide", "provider": "MDN", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"},
        {"title": "React Learn", "provider": "React", "url": "https://react.dev/learn"},
    ],
    "Flutter Developer": [
        {"title": "Flutter Documentation", "provider": "Flutter", "url": "https://docs.flutter.dev/"},
        {"title": "Dart Language Tour", "provider": "Dart", "url": "https://dart.dev/language"},
    ],
    "Government Exams": [
        {"title": "UPSC Active Examinations", "provider": "UPSC", "url": "https://upsc.gov.in/examinations/active-examinations"},
        {"title": "SSC Portal", "provider": "SSC", "url": "https://ssc.gov.in/"},
        {"title": "NTA", "provider": "NTA", "url": "https://www.nta.ac.in/"},
    ],
    "Board Exams": [
        {"title": "NCERT Textbooks", "provider": "NCERT", "url": "https://ncert.nic.in/textbook.php"},
        {"title": "CBSE Academic", "provider": "CBSE", "url": "https://cbseacademic.nic.in/"},
    ],
    "Defence": [
        {"title": "Join Indian Army", "provider": "Indian Army", "url": "https://joinindianarmy.nic.in/"},
        {"title": "Join Indian Navy", "provider": "Indian Navy", "url": "https://www.joinindiannavy.gov.in/"},
    ],
    "Commerce": [
        {"title": "ICAI Student Resources", "provider": "ICAI", "url": "https://www.icai.org/post/students"},
        {"title": "NCERT Textbooks", "provider": "NCERT", "url": "https://ncert.nic.in/textbook.php"},
    ],
    "Management": [
        {"title": "SWAYAM", "provider": "SWAYAM", "url": "https://swayam.gov.in/"},
        {"title": "NTA", "provider": "NTA", "url": "https://www.nta.ac.in/"},
    ],
}

BOARD_CAREER_CATALOG = {
    "10th": {
        "Maths": {
            "title": "Career options after 10th with Maths focus",
            "description": "Maths keeps quantitative, technical, commerce-with-maths, diploma, coding, and defence routes open after class 10.",
            "options": [
                {
                    "title": "Science stream (PCM) in class 11-12",
                    "type": "Academic route",
                    "fit": "Best for engineering, computer science, AI/data foundations, architecture, and technical defence routes.",
                    "next_step": "Strengthen algebra, geometry, and science fundamentals before class 11.",
                    "outcomes": ["Engineering", "Computer Science", "AI/Data", "Architecture"],
                },
                {
                    "title": "Commerce with Maths",
                    "type": "Academic route",
                    "fit": "Good for finance, economics, business analytics, actuarial science, and management pathways.",
                    "next_step": "Keep maths active and compare accountancy, economics, and business studies options.",
                    "outcomes": ["Finance", "Economics", "Analytics", "Management"],
                },
                {
                    "title": "Polytechnic diploma after 10th",
                    "type": "Technical route",
                    "fit": "Strong for students who want an early technical route and practical diploma-based progression.",
                    "next_step": "Review state polytechnic admissions and shortlist branches.",
                    "outcomes": ["Diploma engineering", "Lateral entry BTech", "Technical jobs"],
                },
                {
                    "title": "ITI and technical vocational programs",
                    "type": "Skill route",
                    "fit": "Useful for practical learners who want job-focused technical training after class 10.",
                    "next_step": "Compare trades, duration, and placement support.",
                    "outcomes": ["Technical trades", "Apprenticeships", "Industry jobs"],
                },
                {
                    "title": "Computer and coding foundation path",
                    "type": "Future-ready route",
                    "fit": "Good if you enjoy maths, logic, and problem solving and may want software or AI careers later.",
                    "next_step": "Retain a maths-heavy path and start Python, logic, and basic computer science.",
                    "outcomes": ["Software", "Cybersecurity", "AI/ML", "Data"],
                },
                {
                    "title": "Defence preparation through maths-heavy senior secondary route",
                    "type": "Competitive route",
                    "fit": "Useful if you are considering NDA or technical defence entries later.",
                    "next_step": "Choose a maths-friendly stream and balance studies with fitness and discipline.",
                    "outcomes": ["NDA", "Technical defence", "SSB prep"],
                },
            ],
        },
        "Science": {
            "title": "Career options after 10th through Science",
            "description": "Science opens engineering, medical, research, and technical diploma routes.",
            "options": [
                {
                    "title": "PCB stream for medical and life sciences",
                    "type": "Academic route",
                    "fit": "Good for medicine, nursing, biotech, pharmacy, and life sciences.",
                    "next_step": "Check whether biology interests you enough for long-term study.",
                    "outcomes": ["Medicine", "Pharmacy", "Biotech", "Nursing"],
                },
                {
                    "title": "PCM stream for engineering and technology",
                    "type": "Academic route",
                    "fit": "Best for engineering, computing, architecture, and technical defence.",
                    "next_step": "Strengthen maths and physics fundamentals.",
                    "outcomes": ["Engineering", "Architecture", "Computer Science"],
                },
            ],
        },
        "Commerce": {
            "title": "Career options after 10th with Commerce interest",
            "description": "Commerce after class 10 leads to finance, accounting, management, and professional courses.",
            "options": [
                {
                    "title": "Commerce with Accountancy and Economics",
                    "type": "Academic route",
                    "fit": "Strong for CA, CMA, CS, banking, and finance careers.",
                    "next_step": "Check whether you want to keep maths along with commerce.",
                    "outcomes": ["CA/CMA/CS", "Banking", "Finance", "Business"],
                }
            ],
        },
        "Humanities": {
            "title": "Career options after 10th through Humanities",
            "description": "Humanities can lead to law, civil services foundation, design, teaching, and social sciences.",
            "options": [
                {
                    "title": "Humanities with core social science subjects",
                    "type": "Academic route",
                    "fit": "Good for law, psychology, public policy, teaching, and communication fields.",
                    "next_step": "Choose subjects based on real interest in reading, writing, and social science.",
                    "outcomes": ["Law", "Teaching", "Social Sciences", "Public Policy"],
                }
            ],
        },
        "Not decided": {
            "title": "Career options after 10th if stream is not decided",
            "description": "Compare Science, Commerce, and Humanities based on subject fit and long-term goals before deciding.",
            "options": [
                {
                    "title": "Science stream",
                    "type": "Wide-open route",
                    "fit": "Keeps engineering, medical, defence, and technical options open.",
                    "next_step": "Assess comfort with maths and science.",
                    "outcomes": ["Engineering", "Medical", "Research", "Defence"],
                },
                {
                    "title": "Commerce stream",
                    "type": "Business route",
                    "fit": "Good for finance, CA/CMA/CS, management, and economics.",
                    "next_step": "Assess interest in business, numbers, and finance.",
                    "outcomes": ["Finance", "Business", "Management"],
                },
                {
                    "title": "Humanities stream",
                    "type": "Social science route",
                    "fit": "Good for law, teaching, design, public affairs, and social sciences.",
                    "next_step": "Assess interest in reading, writing, and social science subjects.",
                    "outcomes": ["Law", "Teaching", "Design", "Policy"],
                },
            ],
        },
    }
}


def normalize_skills(skills_text: str) -> List[str]:
    return [part.strip().title() for part in skills_text.split(",") if part.strip()]


def analyze_profile(form: Dict) -> Dict:
    normalized_skills = normalize_skills(form["current_skills"])
    target_skills = ROLE_SKILL_MAP.get(
        form["career_goal"],
        ["Core fundamentals", "Project building", "Communication", "Portfolio development"],
    )
    current_set = {skill.lower() for skill in normalized_skills}
    skill_gaps = [skill for skill in target_skills if skill.lower() not in current_set]
    return {
        "normalized_skills": normalized_skills,
        "target_skills": target_skills,
        "skill_gaps": skill_gaps,
    }


def get_board_profile(stage: str, stream: str) -> Optional[Dict]:
    stage_block = BOARD_CAREER_CATALOG.get(stage) or BOARD_CAREER_CATALOG["10th"]
    return stage_block.get(stream) or stage_block.get("Not decided")


def get_selected_board_option(form: Dict) -> Optional[Dict]:
    if form["career_goal"] != "Board Exams" or not form.get("selected_career_option"):
        return None
    profile = get_board_profile(form["academic_stage"], form["board_stream"])
    for option in profile["options"]:
        if option["title"] == form["selected_career_option"]:
            return option
    return None


def build_trusted_sources(form: Dict, phase_title: str) -> List[Dict]:
    return TRUSTED_SOURCES.get(form["career_goal"], [])[:3]


def build_board_career_aligned_phases(form: Dict, selected_option: Dict) -> List[Dict]:
    stage = form["academic_stage"]
    stream = form["board_stream"]
    outcomes = selected_option["outcomes"][:3]
    title = selected_option["title"]
    return [
        {
            "name": f"Board Foundation for {title}",
            "topics": [f"Class {stage} board fundamentals", f"{stream} stream planning", title, *outcomes],
            "resources": [
                f"Use official board syllabus and sample papers for class {stage}",
                f"Research official eligibility and subject fit for {title}",
                "Create weekly chapter revision blocks with tests",
            ],
            "projects": [
                f"Make a decision sheet for {title} with subject requirements and outcomes",
                f"Map your current board preparation to the needs of {title}",
            ],
            "milestone": f"Understand how {title} connects to your next academic step after class {stage}.",
        },
        {
            "name": f"Career Alignment for {title}",
            "topics": [f"{title} planning", "Subject requirement analysis", "Backup pathway comparison", *outcomes],
            "resources": [
                f"Collect official course, stream, or diploma details for {title}",
                f"Compare {title} with two backup options using authentic sources",
                "Discuss choices with teachers, parents, or mentors",
            ],
            "projects": [
                f"Build a comparison tracker for {title} versus two alternatives",
                f"Create a weekly study + transition plan for {title}",
            ],
            "milestone": f"Be able to explain why {title} is your best-fit post-board option.",
        },
        {
            "name": f"Transition Readiness for {title}",
            "topics": ["Board score strategy", "Transition planning", f"{title} action plan", *outcomes],
            "resources": [
                f"Track admissions or stream choices relevant to {title}",
                "Use official sources to finalize timelines and subject decisions",
                "Maintain board revision cycles while preparing your next step",
            ],
            "projects": [
                f"Prepare a final action plan for moving into {title}",
                f"Complete a board revision calendar linked to {title}",
            ],
            "milestone": f"Finish class {stage} with a documented transition plan into {title}.",
        },
    ]


def build_non_tech_roadmap(form: Dict, analysis: Dict) -> Dict:
    selected_option = get_selected_board_option(form)
    if selected_option:
        phases = build_board_career_aligned_phases(form, selected_option)
    else:
        gap_pool = analysis["skill_gaps"] or analysis["target_skills"]
        phases = [
            {
                "name": "Foundation",
                "topics": [f"{form['career_goal']} syllabus overview", *gap_pool[:3]],
                "resources": [
                    f"Start with official syllabus and study material for {form['career_goal']}",
                    "Create chapter-wise revision tracker",
                    "Use authentic sources and structured practice",
                ],
                "projects": [
                    "Take a baseline test and identify weak areas",
                    "Prepare short notes and a revision system",
                ],
                "milestone": "Finish the first pass of core topics and identify weak areas clearly.",
            },
            {
                "name": "Guided Practice",
                "topics": [*gap_pool[:4], "Previous-year papers", "Timed practice"],
                "resources": [
                    "Use official sample papers and previous-year questions",
                    "Review mistakes weekly",
                    "Maintain a disciplined study timetable",
                ],
                "projects": [
                    "Complete timed practice sets weekly",
                    "Build a mistake notebook with corrections",
                ],
                "milestone": "Reach more stable consistency in topic-wise practice and speed.",
            },
            {
                "name": "Exam Readiness",
                "topics": [*gap_pool[2:6], "Mock tests", "Final revision"],
                "resources": [
                    "Prioritize mocks and high-yield revision material",
                    "Finalize a last-mile revision plan",
                    "Track official updates if relevant",
                ],
                "projects": [
                    "Simulate full exam conditions",
                    "Prepare the final revision calendar",
                ],
                "milestone": "Be ready with a repeatable revision and mock-test strategy.",
            },
        ]

    for phase in phases:
        phase["study_content"] = build_trusted_sources(form, phase["name"])

    roadmap = {
        "title": f"{form['career_goal']} Roadmap",
        "overview": f"This roadmap is designed for a {form['experience_level'].lower()} learner preparing for {form['career_goal']}"
        + (
            f" in class {form['academic_stage']} with {form['board_stream']} stream interest"
            if form["career_goal"] == "Board Exams"
            else ""
        )
        + (
            f" and focusing on {form['selected_career_option']}"
            if form.get("selected_career_option")
            else ""
        )
        + ".",
        "phases": phases,
        "market_trends": [
            "Official syllabus changes and authentic sources matter more than generic summaries.",
            "Consistent revision and mock quality usually matter more than consuming more content.",
        ],
        "professional_tips": [
            "Use official sources as the ground truth.",
            "Track mistakes weekly and revise from that list.",
        ],
    }

    if form["career_goal"] == "Board Exams":
        profile = get_board_profile(form["academic_stage"], form["board_stream"])
        roadmap["career_explorer"] = {
            "title": profile["title"],
            "description": profile["description"],
            "stage": form["academic_stage"],
            "stream": form["board_stream"],
            "selected_option_title": form.get("selected_career_option") or None,
            "options": [
                {**option, "is_selected": option["title"] == form.get("selected_career_option")}
                for option in profile["options"]
            ],
        }

    return roadmap


def build_tech_roadmap(form: Dict, analysis: Dict) -> Dict:
    gap_pool = analysis["skill_gaps"] or analysis["target_skills"]
    phases = [
        {
            "name": "Foundation",
            "topics": [f"{form['career_goal']} fundamentals", *gap_pool[:2]],
            "resources": [f"Official docs for {form['career_goal']}", "Beginner-friendly tutorials", "Weekly notes and revision"],
            "projects": [f"Build a small project using {gap_pool[0] if gap_pool else 'core fundamentals'}"],
            "milestone": f"Build baseline fluency for a {form['career_goal']} path.",
        },
        {
            "name": "Applied Skills",
            "topics": [*gap_pool[:4], "Debugging", "Tooling"],
            "resources": ["Intermediate tutorials", "Open-source examples", "Weekly practice"],
            "projects": [f"Build an intermediate {form['career_goal']} project", "Document your work and results"],
            "milestone": "Complete a project that demonstrates implementation and problem framing.",
        },
        {
            "name": "Professional Readiness",
            "topics": [*gap_pool[2:6], "Portfolio", "Interview preparation"],
            "resources": ["Portfolio reviews", "Mock interviews", "Case studies"],
            "projects": ["Ship a capstone aligned with hiring expectations"],
            "milestone": "Be ready to explain projects and apply for role-aligned opportunities.",
        },
    ]
    for phase in phases:
        phase["study_content"] = build_trusted_sources(form, phase["name"])

    return {
        "title": f"{form['career_goal']} Career Roadmap",
        "overview": f"This roadmap is designed for a {form['experience_level'].lower()} learner moving toward {form['career_goal']}.",
        "phases": phases,
        "market_trends": [
            "Employers value end-to-end project execution.",
            "Documentation and measurable outcomes matter.",
        ],
        "professional_tips": [
            "Keep at least two polished projects.",
            "Review recurring job-description patterns every two weeks.",
        ],
    }


def build_prompt(form: Dict, analysis: Dict) -> str:
    return f"""
You are an expert career coach and curriculum architect.

Track type: {form['path_type']}
Academic stage: {form.get('academic_stage', 'N/A')}
Board stream: {form.get('board_stream', 'N/A')}
Selected academic/career option: {form.get('selected_career_option') or 'None'}
Current skills/background: {', '.join(analysis['normalized_skills']) or 'None'}
Experience level: {form['experience_level']}
Career goal: {form['career_goal']}
Learning preferences: {form['learning_preferences']}
Detected skill gaps: {', '.join(analysis['skill_gaps']) or 'No major gaps detected'}
Target skills: {', '.join(analysis['target_skills'])}

Return only valid JSON with title, overview, phases, marketTrends, and professionalTips.
If a selected academic/career option is present, phase names, topics, resources, projects, and milestones must align directly with that option.
"""


def call_openai(form: Dict, analysis: Dict) -> Optional[Dict]:
    api_key = st.secrets.get("OPENAI_API_KEY", os.environ.get("OPENAI_API_KEY", ""))
    if not api_key:
        return None

    model = st.secrets.get("OPENAI_MODEL", os.environ.get("OPENAI_MODEL", "gpt-4.1-mini"))
    response = requests.post(
        "https://api.openai.com/v1/responses",
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
        json={"model": model, "input": build_prompt(form, analysis)},
        timeout=60,
    )
    response.raise_for_status()
    data = response.json()
    text = data.get("output_text", "")
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1:
        return None
    return json.loads(text[start : end + 1])


def generate_roadmap(form: Dict) -> Dict:
    analysis = analyze_profile(form)
    roadmap = None
    warning = None
    try:
        roadmap = call_openai(form, analysis)
    except Exception as exc:
        warning = str(exc)

    if roadmap:
        # Keep AI output minimal but attach trusted sources/career explorer.
        for phase in roadmap.get("phases", []):
            phase["study_content"] = build_trusted_sources(form, phase.get("name", "Phase"))
        if form["career_goal"] == "Board Exams":
            profile = get_board_profile(form["academic_stage"], form["board_stream"])
            roadmap["career_explorer"] = {
                "title": profile["title"],
                "description": profile["description"],
                "stage": form["academic_stage"],
                "stream": form["board_stream"],
                "selected_option_title": form.get("selected_career_option") or None,
                "options": [
                    {**option, "is_selected": option["title"] == form.get("selected_career_option")}
                    for option in profile["options"]
                ],
            }
        return {"roadmap": roadmap, "warning": warning, "analysis": analysis, "generator": "llm"}

    builder = build_non_tech_roadmap if form["path_type"] == "non-tech" or form["career_goal"] in TRACK_GROUPS["Non-Tech Paths"] else build_tech_roadmap
    return {"roadmap": builder(form, analysis), "warning": warning, "analysis": analysis, "generator": "fallback"}


st.set_page_config(page_title="AI Roadmap", page_icon="🧭", layout="wide")

st.title("AI Roadmap")
st.caption("Streamlit deployment version of the roadmap planner")

with st.sidebar:
    st.subheader("Planner controls")
    track_type = st.radio("Track", options=["tech", "non-tech"], format_func=lambda v: "Tech Paths" if v == "tech" else "Non-Tech Paths")
    career_options = TRACK_GROUPS["Tech Paths"] if track_type == "tech" else TRACK_GROUPS["Non-Tech Paths"]
    career_goal = st.selectbox("Career goal", career_options)
    experience_level = st.selectbox("Experience level", ["Beginner", "Intermediate", "Advanced"])
    academic_stage = "10th"
    board_stream = "Maths"
    selected_career_option = ""
    if career_goal == "Board Exams":
        academic_stage = st.selectbox("Current class", ["10th", "11th", "12th"])
        board_stream = st.selectbox("Preferred stream / current stream", ["Maths", "Science", "Commerce", "Humanities", "Not decided"])
        profile = get_board_profile(academic_stage, board_stream)
        selected_career_option = st.selectbox(
            "Career option to align phases with",
            [""] + [option["title"] for option in profile["options"]],
            format_func=lambda v: "General board roadmap" if v == "" else v,
        )

current_skills = st.text_area("Current skills or background", "JavaScript, HTML, CSS", height=120)
learning_preferences = st.text_area(
    "Learning preferences",
    "Project-based learning, visual explanations, and weekly milestones.",
    height=120,
)

if st.button("Generate roadmap", type="primary", use_container_width=True):
    form = {
        "path_type": track_type,
        "career_goal": career_goal,
        "experience_level": experience_level,
        "academic_stage": academic_stage,
        "board_stream": board_stream,
        "selected_career_option": selected_career_option,
        "current_skills": current_skills,
        "learning_preferences": learning_preferences,
    }
    st.session_state["result"] = generate_roadmap(form)
    st.session_state["form"] = form

result = st.session_state.get("result")
form = st.session_state.get("form")

if result:
    roadmap = result["roadmap"]
    analysis = result["analysis"]
    c1, c2, c3 = st.columns(3)
    c1.metric("Phases", len(roadmap["phases"]))
    c2.metric("Trusted sources", sum(len(phase.get("study_content", [])) for phase in roadmap["phases"]))
    c3.metric("Mode", result["generator"])

    st.subheader(roadmap["title"])
    st.write(roadmap["overview"])

    if result.get("warning"):
        st.info(f"Using fallback roadmap because AI generation was unavailable: {result['warning']}")

    if roadmap.get("career_explorer"):
        explorer = roadmap["career_explorer"]
        st.markdown("### Career explorer")
        st.write(explorer["description"])
        grid = st.columns(3)
        for idx, option in enumerate(explorer["options"]):
            with grid[idx % 3]:
                st.markdown(f"**{option['title']}**")
                st.caption(option["type"])
                st.write(option["fit"])
                st.write(f"Next step: {option['next_step']}")
                st.write("Outcomes: " + ", ".join(option["outcomes"]))
                if option["is_selected"]:
                    st.success("Active roadmap path")

    st.markdown("### Roadmap phases")
    for phase in roadmap["phases"]:
        with st.container(border=True):
            st.markdown(f"#### {phase['name']}")
            left, right = st.columns([1, 1])
            with left:
                st.markdown("**Topics**")
                for item in phase["topics"]:
                    st.write(f"- {item}")
                st.markdown("**Resources**")
                for item in phase["resources"]:
                    st.write(f"- {item}")
            with right:
                st.markdown("**Projects / practice tasks**")
                for item in phase["projects"]:
                    st.write(f"- {item}")
                st.markdown("**Milestone**")
                st.write(phase["milestone"])
            if phase.get("study_content"):
                st.markdown("**Trusted study content**")
                for source in phase["study_content"]:
                    st.markdown(f"- [{source['title']}]({source['url']}) · {source['provider']}")

    side_left, side_right = st.columns(2)
    with side_left:
        st.markdown("### Market trends")
        for trend in roadmap["market_trends"]:
            st.write(f"- {trend}")
    with side_right:
        st.markdown("### Professional tips")
        for tip in roadmap["professional_tips"]:
            st.write(f"- {tip}")

    with st.expander("Profile analysis"):
        st.write("Target skills:", ", ".join(analysis["target_skills"]))
        st.write("Skill gaps:", ", ".join(analysis["skill_gaps"]) or "None")
