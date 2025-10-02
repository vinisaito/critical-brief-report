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
  status: "critical" | "high" | "medium" | "low";
  timeline: TimelineItem[];
  rdms: RDM[];
}

export const IncidentReport = ({
  number,
  title,
  date,
  crisisRoom,
  status,
  timeline,
  rdms,
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
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
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
            <Badge className={`${getStatusColor(status)} px-4 py-2 text-sm font-semibold`}>
              {status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Calendar className="h-4 w-4 text-primary" />
                Data do Incidente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{date}</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Users className="h-4 w-4 text-primary" />
                Sala de Crise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{crisisRoom}</p>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="border-border shadow-md">
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
        <Card className="border-border shadow-md">
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
