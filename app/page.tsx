
'use client'
import Login from "@/component/auth/Login";
import { SnackbarProvider } from "notistack";

export default function Home() {
  return (
    <>
    <SnackbarProvider
          autoHideDuration={4000}
          maxSnack={2}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
         {/* {children} */}
         <Login />
        </SnackbarProvider>
   
    </>
  );
}
