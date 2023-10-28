'use client'
import { useState,useRef } from "react";

import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddGamePresenter() {
  const [name, setName] = useState("");
  const [shift, setShift] = useState("");
  
  const queryClient = useQueryClient();
  const toastGamePresenterIdRef = useRef<string | undefined>(undefined);


      const { mutate } = useMutation(
        (data: { name: string; shift: string }) =>
           axios.post("/api/presenters/addPresenter", data), 
  {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
    
      },
      onSuccess: () => {
        toast.success("Game presenter added successfully", {
          id: toastGamePresenterIdRef.current,
        });
        queryClient.invalidateQueries(["presenters"]);
        setName("");
        setShift("");
      },
 
    }
  );

  const submitGamePresenter = async (e: React.FormEvent) => {
    e.preventDefault();
    toastGamePresenterIdRef.current = toast.loading("Creating your game presenter", {
      id: toastGamePresenterIdRef.current,
    });
  
    mutate({ name, shift });
  };
  

  return (
    <form onSubmit={submitGamePresenter}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Shift:
        <select value={shift} onChange={(e) => setShift(e.target.value)}>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Night">Night</option>
        </select>
      </label>
      <br />
      <button type="submit">
        Create Game Presenter
      </button>
    </form>
  );
}
