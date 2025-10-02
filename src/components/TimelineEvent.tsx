import { CheckCircle2, Circle, Clock } from "lucide-react";

interface TimelineEventProps {
  time: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  isLast?: boolean;
}

export const TimelineEvent = ({
  time,
  title,
  description,
  status,
  isLast = false,
}: TimelineEventProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "current":
        return (
          <div className="relative">
            <Clock className="h-5 w-5 text-primary animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
        );
      case "pending":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getLineColor = () => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "current":
        return "bg-primary";
      case "pending":
        return "bg-border";
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-border shadow-sm">
          {getStatusIcon()}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-2 min-h-[40px] ${getLineColor()}`} />
        )}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <time className="text-sm font-medium text-primary whitespace-nowrap">
            {time}
          </time>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
