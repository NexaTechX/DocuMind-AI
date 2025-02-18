import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function ErrorHandler({ error }: { error: Error }) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Error",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });
  }, [error, toast]);

  return null;
}
