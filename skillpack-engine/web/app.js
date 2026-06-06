const el=id=>document.getElementById(id);
el('gen').onclick=async()=>{
  const cfg={version:el('version').value,role:el('role').value,deployment:el('deployment').value,industry:el('industry').value,complexity:el('complexity').value};
  const score=cfg.complexity==='small'?78:cfg.complexity==='enterprise'?66:58;
  el('out').textContent=JSON.stringify({summary:`Maximo ${cfg.version} ${cfg.role} (${cfg.deployment})`,readiness:{overall:score},risks:['integration-backlog-growth','security-group-drift'],tribal:['hidden-custom-script-coupling']},null,2);
};
