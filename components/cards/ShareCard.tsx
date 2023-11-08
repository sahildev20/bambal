'use client'

import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface Props {
    profile_url:string;
  }

function ShareCard( { profile_url}:Props) {

    const [alert, setAlert] = useState("")

    function copyText(txt:string){
        navigator.clipboard.writeText(txt);
        setAlert("link has been copied!")
        return
    }
  return (
    <Dialog onOpenChange={()=>setAlert("")}>
      <DialogTrigger asChild>
      <button className="outline outline-2 outline-slate-500 text-white font-bold px-6 rounded-full">
          Share
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-dark-1 text-light-1">
        <DialogHeader>
          <DialogTitle className="">Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this Profile.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 bg-dark-1">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only boder-none">
              Link
            </Label>
            <Input
              id="link"
              className="bg-dark-2 border-none"
              defaultValue={profile_url}
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3 rounded-lg bg-primary-500" onClick={()=>copyText(profile_url)}>
          <p className="text-white text-subtle-medium">Copy Link</p>            
          </Button>
        </div>
        <DialogFooter className="sm:justify-start items-center">
          <DialogClose asChild>
            <Button type="button" size="sm" variant="secondary">
            <p className="text-subtle-medium">Close</p> 
            </Button>
          </DialogClose>
          <p className="text-light-1">{alert}</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShareCard;
