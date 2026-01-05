import { Globe } from "lucide-react";
import {
  GithubIcon,
  NpmIcon,
  AppStoreIcon,
  GooglePlayIcon,
} from "@/components/icons";

/** Returns the appropriate icon component for a link type */
export function getLinkIcon(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType === "github" || normalizedType === "source") {
    return <GithubIcon className="size-3" />;
  }
  if (normalizedType === "npm" || normalizedType === "registry") {
    return <NpmIcon className="size-3" />;
  }
  if (normalizedType === "app store" || normalizedType === "appstore") {
    return <AppStoreIcon className="size-3" />;
  }
  if (
    normalizedType === "play store" ||
    normalizedType === "playstore" ||
    normalizedType === "google play"
  ) {
    return <GooglePlayIcon className="size-3" />;
  }
  // Website and other types default to globe
  return <Globe className="size-3" />;
}
