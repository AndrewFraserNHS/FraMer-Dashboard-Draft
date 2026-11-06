import {
  AlertCircle,
  AlertTriangle,
  AlertOctagon,
  Heart,
  Pill,
  FileText,
  Calendar,
  ClipboardList,
  Stethoscope,
  Shield,
  Baby,
  Eye,
  Zap,
  Search,
  ChevronDown,
  MoreVertical,
  HelpCircle,
  LogOut,
  Settings,
  Bell,
  MessageSquare,
} from "lucide-react";

export const riskIcons = {
  high: AlertOctagon,
  medium: AlertTriangle,
  low: AlertCircle,
} as const;

export const itemIcons = {
  allergies: AlertCircle,
  condition: Heart,
  medicine: Pill,
  document: FileText,
  appointment: Calendar,
  careplan: ClipboardList,
  event: Stethoscope,
  safeguarding: Shield,
  pregnancy: Baby,
  results: Eye,
  diabetes: Zap,
} as const;

export const utilityIcons = {
  search: Search,
  menu: ChevronDown,
  more: MoreVertical,
  help: HelpCircle,
  logout: LogOut,
  settings: Settings,
  notification: Bell,
  feedback: MessageSquare,
} as const;

export const iconStyles = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
  neutral: "text-grey-2",
} as const;
