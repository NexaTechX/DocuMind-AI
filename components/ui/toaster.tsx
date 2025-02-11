"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="hu:.722">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="8dzcjs7">
            <div className="grid gap-1" data-oid="2cjmbwj">
              {title && <ToastTitle data-oid="52ei55b">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="r28n5q-">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="c221n0k" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="ukh5f88" />
    </ToastProvider>
  );
}
