import { AlertCircle, Calendar, Users, Clock, GitBranch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TimelineEvent } from "@/components/TimelineEvent";

interface RDM {
  id: string;
  title: string;
  status: "approved" | "pending" | "rejected";
  date: string;
}

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
}

interface IncidentReportProps {
  number: string;
  title: string;
  date: string;
  crisisRoom: string;
  operator: string;
  crisisManager: string;
  status: "critical" | "high" | "medium" | "low";
  timeline: TimelineItem[];
  rdms: RDM[];
  logo?: string;
}

export const IncidentReport = ({
  number,
  title,
  date,
  crisisRoom,
  operator,
  crisisManager,
  status,
  timeline,
  rdms,
  logo,
}: IncidentReportProps) => {
  const getStatusColor = (status: string) => {
    const colors = {
      critical: "bg-destructive text-destructive-foreground",
      high: "bg-warning text-warning-foreground",
      medium: "bg-primary text-primary-foreground",
      low: "bg-success text-success-foreground",
    };
    return colors[status as keyof typeof colors] || colors.medium;
  };

  const getRDMStatusColor = (rdmStatus: string) => {
    const colors = {
      approved: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return colors[rdmStatus as keyof typeof colors] || colors.pending;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-8 lg:p-12">
        {/* Logo */}
        {logo && (
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Logo da Empresa" className="h-20 w-auto object-contain" />
          </div>
        )}

        {/* Header */}
        <div id="header" className="space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Incidente #{number}
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                      {title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <Badge className={`${getStatusColor(status)} px-4 py-2 text-sm font-semibold`}>
              {status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Info Cards */}
        <div id="info" className="grid gap-3 md:grid-cols-4">
          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                Data do Incidente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-foreground">{date}</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-3.5 w-3.5 text-primary" />
                Sala de Crise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-foreground">{crisisRoom}</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-3.5 w-3.5 text-primary" />
                Operador
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-foreground">{operator}</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-3.5 w-3.5 text-primary" />
                Gestor de Crise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-foreground">{crisisManager}</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card id="timeline" className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Clock className="h-5 w-5 text-primary" />
              Timeline do Incidente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <TimelineEvent
                  key={index}
                  time={event.time}
                  title={event.title}
                  description={event.description}
                  status={event.status}
                  isLast={index === timeline.length - 1}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RDMs */}
        <Card id="rdms" className="border-border shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <GitBranch className="h-5 w-5 text-primary" />
              RDMs Relacionados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rdms.map((rdm, index) => (
                <div key={rdm.id}>
                  <div className="flex items-center justify-between gap-4 py-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-primary">
                          {rdm.id}
                        </span>
                        <Badge
                          variant="outline"
                          className={getRDMStatusColor(rdm.status)}
                        >
                          {rdm.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {rdm.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{rdm.date}</p>
                    </div>
                  </div>
                  {index < rdms.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
