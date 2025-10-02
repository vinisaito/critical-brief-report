import { IncidentReport } from "@/components/IncidentReport";

const Index = () => {
  // Dados de exemplo do incidente
  const incidentData = {
    number: "INC-2025-0042",
    title: "Falha Crítica no Sistema de Pagamentos",
    date: "02 de Outubro de 2025 - 14:23",
    crisisRoom: "Sala Zeus - Andar 5",
    operator: "João Silva",
    crisisManager: "Maria Santos",
    status: "critical" as const,
    timeline: [
      {
        time: "14:23",
        title: "Detecção do Incidente",
        description:
          "Sistema de monitoramento identificou falha no processamento de pagamentos. Taxa de erro aumentou para 95%.",
        status: "completed" as const,
      },
      {
        time: "14:28",
        title: "Sala de Crise Ativada",
        description:
          "Equipes de TI, Produto e Operações mobilizadas. Sala Zeus ativada para coordenação.",
        status: "completed" as const,
      },
      {
        time: "14:45",
        title: "Diagnóstico Inicial",
        description:
          "Identificada sobrecarga no servidor de processamento. Investigando causa raiz e possíveis soluções.",
        status: "current" as const,
      },
      {
        time: "15:00",
        title: "Implementação de Correção",
        description:
          "Aguardando aprovação de RDM para deploy de correção emergencial.",
        status: "pending" as const,
      },
      {
        time: "15:30",
        title: "Validação e Monitoramento",
        description:
          "Validação da correção em ambiente de produção e monitoramento intensivo.",
        status: "pending" as const,
      },
    ],
    rdms: [
      {
        id: "RDM-2025-1842",
        title: "Deploy emergencial de patch de correção para servidor de pagamentos",
        status: "pending" as const,
        date: "02/10/2025 14:52",
      },
      {
        id: "RDM-2025-1843",
        title: "Aumento temporário de capacidade computacional",
        status: "approved" as const,
        date: "02/10/2025 14:40",
      },
      {
        id: "RDM-2025-1844",
        title: "Rollback para versão anterior do sistema",
        status: "rejected" as const,
        date: "02/10/2025 14:35",
      },
    ],
  };

  return <IncidentReport {...incidentData} logo="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=80&fit=crop" />;
};

export default Index;
