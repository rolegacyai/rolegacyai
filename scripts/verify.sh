#!/usr/bin/env bash
set -euo pipefail
python scripts/generate_maximo_skillpack.py --version 9 --role integration-consultant --deployment mas-openshift --industry transport --complexity enterprise --out outputs/verify-sample
for f in skillpack.md skillpack.json skillpack.html readiness_report.md implementation_plan.md customer_questions.md integration_checklist.md deployment_model_notes.md operational_support_guide.md risks_and_controls.md upgrade_migration_notes.md tribal_knowledge.md ai_workflow_opportunities.md; do
  test -f outputs/verify-sample/$f
 done
python - <<'PY'
import json
json.load(open('outputs/verify-sample/skillpack.json'))
for p in ['knowledge/maximo/versions.json','knowledge/maximo/mas_9_profile.json']:
  json.load(open(p))
print('json ok')
PY
