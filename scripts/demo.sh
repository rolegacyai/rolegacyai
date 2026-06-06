#!/usr/bin/env bash
set -euo pipefail
python scripts/generate_maximo_skillpack.py --version 9 --role integration-consultant --deployment mas-openshift --industry transport --complexity enterprise --out outputs/maximo-mas9-integration-transport
python scripts/generate_maximo_skillpack.py --version 8 --role architect --deployment mas-openshift --industry utilities --complexity regulated --out outputs/maximo-mas8-architect-utilities
python scripts/generate_maximo_skillpack.py --version 7.6 --role administrator --deployment traditional-websphere --industry manufacturing --complexity small --out outputs/maximo-76-admin-manufacturing
cd skillpack-engine/web
python -m http.server 8000
