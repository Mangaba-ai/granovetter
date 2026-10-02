#!/usr/bin/env python3
"""
Monitor de Progresso — Transição Remota

Acompanha KPIs da transição em tempo real.
Execute semanalmente para gerar relatório.

Uso:
  python monitor_progresso.py
  # Responda perguntas
  # Gera relatório HTML
"""

import json
from datetime import datetime, timedelta
from pathlib import Path

class MonitorProgresso:
    def __init__(self):
        self.data = {}
        self.fase_atual = self.detectar_fase()

    def detectar_fase(self):
        """Detecta qual fase estamos (baseado em data)"""
        hoje = datetime.now()
        # Assumindo que a data de start é hoje para demo
        data_start = hoje

        dias_desde_start = (hoje - data_start).days

        if dias_desde_start < -42:  # Semana -6+
            return "FASE_0"
        elif dias_desde_start < -7:  # Semana -1+
            return "FASE_1"
        elif dias_desde_start < 28:  # Semana +4
            return "FASE_2"
        else:
            return "FASE_3"

    def perguntar_metricas_fase_0(self):
        """Coleta métricas da Fase 0"""
        print("\n🔧 FASE 0: PREPARAÇÃO")
        print("=" * 50)

        metricas = {}

        # TI Readiness
        print("\n📊 TI Readiness (0-100%):")
        metricas['ti_readiness'] = int(input("  VPN + Banda + Security (0-100): "))

        # Ops Processes
        print("\n🔧 Ops Processes Redesigned (%):")
        metricas['ops_redesigned'] = int(input("  % de processos criticos redesenhados (0-100): "))

        # Exec Alignment
        print("\n👔 Executive Alignment (1-5):")
        metricas['exec_alignment'] = int(input("  Quão alinhada está a C-suite? (1-5): "))

        # Budget
        print("\n💰 Budget Approval:")
        metricas['budget_approved'] = input("  Orçamento aprovado? (sim/não): ").lower() == 'sim'

        return metricas

    def perguntar_metricas_fase_1(self):
        """Coleta métricas da Fase 1"""
        print("\n🚀 FASE 1: ADOÇÃO RÁPIDA")
        print("=" * 50)

        metricas = {}

        print("\n👥 Campeões de Mudança:")
        metricas['campeoes_recrutados'] = int(input("  Quantos foram recrutados? (meta: 15-20): "))
        metricas['campeoes_treinados'] = int(input("  Quantos foram treinados? "))

        print("\n📢 Comunicação:")
        metricas['town_hall_executada'] = input("  Town Hall CEO executada? (sim/não): ").lower() == 'sim'
        metricas['emails_enviados'] = int(input("  Emails de comunicação enviados (meta: 3): "))

        print("\n🎓 Workshop Liderança:")
        metricas['gestores_treinados'] = int(input("  Quantos gestores treinados? (meta: 40): "))
        metricas['confianca_media_gestores'] = float(input("  Confiança média em liderar remoto (1-10): "))

        print("\n🤝 Diálogos com Clientes:")
        metricas['clientes_1on1'] = int(input("  Quantos clientes top 20 tivemos 1:1? (meta: 20): "))
        metricas['churn_risk'] = input("  Clientes em risco de churn? (nenhum/alguns/muitos): ")

        return metricas

    def perguntar_metricas_fase_2(self):
        """Coleta métricas da Fase 2"""
        print("\n📈 FASE 2: GO-LIVE")
        print("=" * 50)

        metricas = {}

        print("\nℹ️ Qual semana do go-live? (0-4):")
        semana = int(input("  Semana (0=Eng, 1=Vendas, 2=Gestão, 3=Ops, 4=Estab): "))

        print(f"\n🎯 Métricas Semana {semana}:")
        metricas['semana'] = semana
        metricas['grupo'] = ['Eng', 'Vendas', 'Gestão', 'Ops', 'Estabilização'][semana]

        metricas['pessoas_remotas'] = int(input("  Quantas pessoas já remotas? "))
        metricas['satisfacao'] = float(input("  Satisfação média (1-5): "))
        metricas['uptime_pct'] = float(input("  Uptime técnico (%):\n"))
        metricas['problemas_criticos'] = int(input("  Quantos problemas críticos? (meta: 0-1): "))

        print("\n📊 Por grupo:")
        metricas['eng_adocao'] = int(input("  Eng adoção (%):\n"))
        metricas['vendas_adocao'] = int(input("  Vendas adoção (%):\n"))
        metricas['gestao_adocao'] = int(input("  Gestão adoção (%):\n"))
        metricas['ops_adocao'] = int(input("  Ops adoção (%):\n"))

        return metricas

    def perguntar_metricas_fase_3(self):
        """Coleta métricas da Fase 3"""
        print("\n✅ FASE 3: CONSOLIDAÇÃO")
        print("=" * 50)

        metricas = {}

        print(f"\nℹ️ Semana pós go-live (5-12):")
        semana = int(input("  Qual semana? (5-12): "))
        metricas['semana'] = semana

        print(f"\n📊 Métricas Semana {semana}:")
        metricas['adocao_geral'] = int(input("  Adoção geral (%):\n"))
        metricas['satisfacao_geral'] = float(input("  Satisfação (1-5):\n"))
        metricas['pertencimento'] = float(input("  Pertencimento (1-5):\n"))
        metricas['ansiedade'] = int(input("  Nível de ansiedade (1-100):\n"))

        print("\n🎯 Estabilidade:")
        metricas['incidentes_tecnicos'] = int(input("  Incidentes técnicos (meta: 0-1): "))
        metricas['churn_cliente'] = float(input("  Churn cliente (%):\n"))

        metricas['coaching_completo'] = input("  Follow-up coaching completo? (sim/não): ").lower() == 'sim'
        metricas['cultura_intencional'] = input("  Cultura remota iniciada? (sim/não): ").lower() == 'sim'

        return metricas

    def coletar_metricas(self):
        """Coleta métricas baseado na fase"""
        if self.fase_atual == "FASE_0":
            return self.perguntar_metricas_fase_0()
        elif self.fase_atual == "FASE_1":
            return self.perguntar_metricas_fase_1()
        elif self.fase_atual == "FASE_2":
            return self.perguntar_metricas_fase_2()
        else:
            return self.perguntar_metricas_fase_3()

    def calcular_score(self, metricas):
        """Calcula score geral (0-100)"""
        if self.fase_atual == "FASE_0":
            score = (
                metricas.get('ti_readiness', 0) * 0.3 +
                metricas.get('ops_redesigned', 0) * 0.3 +
                metricas.get('exec_alignment', 0) * 20 +
                (100 if metricas.get('budget_approved') else 0) * 0.1
            ) / 100
            return int(score)

        elif self.fase_atual == "FASE_1":
            score = (
                metricas.get('campeoes_treinados', 0) / 20 * 100 * 0.2 +
                (100 if metricas.get('town_hall_executada') else 0) * 0.1 +
                metricas.get('gestores_treinados', 0) / 40 * 100 * 0.3 +
                metricas.get('clientes_1on1', 0) / 20 * 100 * 0.2 +
                metricas.get('confianca_media_gestores', 0) / 10 * 100 * 0.2
            ) / 100
            return int(score)

        elif self.fase_atual == "FASE_2":
            score = (
                metricas.get('satisfacao', 0) / 5 * 100 * 0.3 +
                metricas.get('uptime_pct', 0) * 0.2 +
                (100 - metricas.get('problemas_criticos', 0) * 20) * 0.2 +
                (metricas.get('eng_adocao', 0) +
                 metricas.get('vendas_adocao', 0) +
                 metricas.get('gestao_adocao', 0) +
                 metricas.get('ops_adocao', 0)) / 4 * 0.3
            ) / 100
            return int(score)

        else:  # FASE_3
            score = (
                metricas.get('adocao_geral', 0) * 0.3 +
                metricas.get('satisfacao_geral', 0) / 5 * 100 * 0.2 +
                metricas.get('pertencimento', 0) / 5 * 100 * 0.2 +
                (100 - metricas.get('ansiedade', 0)) * 0.1 +
                (100 if not metricas.get('incidentes_tecnicos', 1) else 50) * 0.1 +
                (100 - metricas.get('churn_cliente', 0) * 50) * 0.1
            ) / 100
            return int(score)

    def gerar_relatorio_html(self, metricas, score):
        """Gera relatório HTML visual"""
        data_agora = datetime.now().strftime("%Y-%m-%d %H:%M")

        html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Granovetter Progress Report</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }}
        .container {{
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #333;
            text-align: center;
            margin-bottom: 10px;
        }}
        .subtitle {{
            text-align: center;
            color: #666;
            font-size: 14px;
            margin-bottom: 30px;
        }}
        .score-box {{
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            color: white;
        }}
        .score {{
            font-size: 48px;
            font-weight: bold;
            margin: 0;
        }}
        .score-label {{
            font-size: 14px;
            margin-top: 5px;
        }}
        .fase-header {{
            background: #667eea;
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 20px;
        }}
        .metric {{
            display: flex;
            justify-content: space-between;
            padding: 12px;
            border-bottom: 1px solid #eee;
        }}
        .metric:last-child {{
            border-bottom: none;
        }}
        .metric-name {{
            font-weight: 500;
            color: #333;
        }}
        .metric-value {{
            color: #667eea;
            font-weight: bold;
        }}
        .good {{ color: #10b981; }}
        .warning {{ color: #f59e0b; }}
        .danger {{ color: #ef4444; }}
        .progress-bar {{
            width: 100px;
            height: 8px;
            background: #eee;
            border-radius: 4px;
            overflow: hidden;
            margin-left: 10px;
        }}
        .progress-fill {{
            height: 100%;
            background: #667eea;
            transition: width 0.3s;
        }}
        .recommendation {{
            background: #f0f9ff;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #999;
            font-size: 12px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Granovetter Progress Report</h1>
        <div class="subtitle">
            {self.fase_atual} | {data_agora}
        </div>

        <div class="score-box">
            <div class="score">{score}</div>
            <div class="score-label">Saúde geral da transição</div>
        </div>

        <div class="fase-header">📋 {self.fase_atual}: Métricas</div>
"""

        for chave, valor in metricas.items():
            if isinstance(valor, bool):
                valor_str = "✅ Sim" if valor else "❌ Não"
                cor = "good" if valor else "danger"
            elif isinstance(valor, (int, float)):
                if isinstance(valor, float):
                    valor_str = f"{valor:.1f}"
                else:
                    valor_str = str(valor)

                # Cor baseada em tipo de métrica
                if 'adocao' in chave or 'treinados' in chave or 'uptime' in chave:
                    if valor >= 80:
                        cor = "good"
                    elif valor >= 60:
                        cor = "warning"
                    else:
                        cor = "danger"
                else:
                    cor = ""
            else:
                valor_str = str(valor)
                cor = ""

            label = chave.replace('_', ' ').title()

            html += f"""
        <div class="metric">
            <span class="metric-name">{label}</span>
            <span class="metric-value {cor}">{valor_str}</span>
        </div>
"""

        html += """
        <div class="recommendation">
            <strong>Recomendação:</strong><br>
            Continue acompanhando métricas semanalmente.
            Revise estratégia se score cair abaixo de 60.
        </div>

        <div class="footer">
            Gerado por Granovetter Implementation Kit<br>
            https://github.com/dheiver2/granovetter
        </div>
    </div>
</body>
</html>
"""
        return html

    def salvar_relatorio(self, html, metricas):
        """Salva relatório em arquivo"""
        arquivo = Path("relatorio_progresso.html")
        arquivo.write_text(html)
        print(f"\n✅ Relatório salvo: {arquivo.absolute()}")
        print(f"   Abra no navegador para visualizar")

    def executar(self):
        """Executa o monitor"""
        print("\n" + "="*50)
        print("📊 MONITOR DE PROGRESSO — GRANOVETTER")
        print("="*50)
        print(f"\nFase detectada: {self.fase_atual}")
        print("\nResponda as perguntas abaixo:")

        metricas = self.coletar_metricas()
        score = self.calcular_score(metricas)

        print(f"\n{'='*50}")
        print(f"SCORE GERAL: {score}/100")
        print(f"{'='*50}\n")

        html = self.gerar_relatorio_html(metricas, score)
        self.salvar_relatorio(html, metricas)

        # Também salva JSON para histórico
        historico_arquivo = Path("historico_metricas.json")
        historico = []
        if historico_arquivo.exists():
            historico = json.loads(historico_arquivo.read_text())

        historico.append({
            "data": datetime.now().isoformat(),
            "fase": self.fase_atual,
            "score": score,
            "metricas": metricas
        })

        historico_arquivo.write_text(json.dumps(historico, indent=2, ensure_ascii=False))
        print(f"✅ Histórico salvo: {historico_arquivo}")

if __name__ == "__main__":
    monitor = MonitorProgresso()
    monitor.executar()
