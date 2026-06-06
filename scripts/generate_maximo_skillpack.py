#!/usr/bin/env python3
import argparse, json, os
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
KB=ROOT/'knowledge'/'maximo'

def load(name):
    return json.loads((KB/name).read_text())

def score(complexity):
    base={'small':78,'enterprise':66,'regulated':58}.get(complexity,65)
    return {'overall':base,'status':'green' if base>=75 else 'amber' if base>=60 else 'red'}

def render(params):
    risks=load('operational_risks.json')['risks']
    tribal=load('tribal_knowledge_patterns.json')['patterns']
    questions=load('customer_environment_questions.json')['questions']
    s=score(params['complexity'])
    return {
      'summary':f"Maximo {params['version']} {params['role']} for {params['industry']} in {params['deployment']}",
      'readiness':s,
      'functional_map':load('functional_domains.json')['domains'],
      'technical_map':load('technical_domains.json')['domains'],
      'integration_map':load('integration_patterns.json')['patterns'],
      'risks':risks,'tribal':tribal,'questions':questions,
      'onboarding':{'30':'shadow runbooks and incidents','60':'own prioritized integrations and cron governance','90':'lead release readiness + handover simulation'},
      'demo_talk_track':['Context and version/deployment','Top risks and controls','Readiness score and 90-day successor plan']
    }

def write_files(out,data):
    out.mkdir(parents=True,exist_ok=True)
    (out/'skillpack.json').write_text(json.dumps(data,indent=2))
    md=f"# Skillpack\n\n## Role overview\n{data['summary']}\n\n## Functional capability map\n- " + "\n- ".join(data['functional_map'])+"\n\n## Technical capability map\n- "+"\n- ".join(data['technical_map'])+"\n\n## Integration capability map\n- "+"\n- ".join(data['integration_map'])+f"\n\n## Successor readiness\nScore: {data['readiness']['overall']} ({data['readiness']['status']})\n"
    (out/'skillpack.md').write_text(md)
    (out/'skillpack.html').write_text(f"<html><body><h1>{data['summary']}</h1><pre>{json.dumps(data,indent=2)}</pre></body></html>")
    for n,c in {
      'readiness_report.md':f"# Readiness Report\nOverall: {data['readiness']['overall']}\n",
      'implementation_plan.md':'# Implementation Plan\n1. Baseline\n2. Stabilize\n3. Optimize\n',
      'customer_questions.md':'# Customer Questions\n- '+'\n- '.join(data['questions'])+'\n',
      'integration_checklist.md':'# Integration Checklist\n- Contract ownership\n- Retry/idempotency\n- Monitoring\n',
      'deployment_model_notes.md':'# Deployment Notes\nInclude OpenShift/WebSphere operating model deltas.\n',
      'operational_support_guide.md':'# Operational Support Guide\n- Incident triage\n- Escalation package\n- Recovery drills\n',
      'risks_and_controls.md':'# Risks and Controls\n- '+'\n- '.join(data['risks'])+'\n',
      'upgrade_migration_notes.md':'# Upgrade & Migration\nAssess customizations, scripts, interfaces, data-volume behaviors.\n',
      'tribal_knowledge.md':'# Tribal Knowledge\n- '+'\n- '.join(data['tribal'])+'\n',
      'ai_workflow_opportunities.md':'# AI Workflow Opportunities\n- Summarize incident patterns\n- Draft runbook deltas\n- Successor onboarding copilots\n'
    }.items():
      (out/n).write_text(c)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--version',required=True)
    ap.add_argument('--role',required=True)
    ap.add_argument('--deployment',required=True)
    ap.add_argument('--industry',required=True)
    ap.add_argument('--complexity',required=True)
    ap.add_argument('--out',required=True)
    a=ap.parse_args(); data=render(vars(a)); write_files(Path(a.out),data)
    print('Generated',a.out)

if __name__=='__main__': main()
