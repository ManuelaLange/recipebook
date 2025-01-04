"use client";
import * as Toast from "@radix-ui/react-toast";

export default function Menssage({ setOpen, open, message, description }) {
  return (
    <>
      <Toast.Provider swipeDirection="right" duration={5000}>
        <Toast.Root
          className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="mb-[5px] text-[15px] font-medium text-slate12 [grid-area:_title]">
            {message}
          </Toast.Title>
          {description && (
            <Toast.Description asChild>
              <time className="m-0 text-[13px] leading-[1.3] text-slate11 [grid-area:_description]">
                {description}
              </time>
            </Toast.Description>
          )}
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
      </Toast.Provider>
    </>
  );
}
