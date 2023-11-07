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



function ProfileModal( { profile_url}:Props) {
  return (
    <Dialog >
      <DialogTrigger asChild>
      <button className="outline outline-2 outline-slate-500 text-white font-bold px-6 rounded-full">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-dark-1 text-light-1">
        <DialogHeader>
          <DialogTitle className="">Information</DialogTitle>
          <DialogDescription>
            I am working on this feature you will get it soon...
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start items-center">
          <DialogClose asChild>
            <Button type="button" size="sm" variant="secondary">
            <p className="text-subtle-medium">Okay</p> 
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;
