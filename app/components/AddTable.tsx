"use client";
import { useState, useRef } from "react";

import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, FormControl, TextField } from "@mui/material";

export default function AddGameTable() {
  const [name, setName] = useState("");



  const queryClient = useQueryClient();
  const toastGameTableIdRef = useRef<string | undefined>(undefined);

  const { mutate } = useMutation(
    (data: { name: string }) => axios.post("/api/tables/addTable", data),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
      },
      onSuccess: () => {
        toast.success("Game table added successfully", {
          id: toastGameTableIdRef.current,
        });
        queryClient.invalidateQueries(["tables"]);
        setName("");
      },
    }
  );

  const submitGameTable = async (e: React.FormEvent) => {
    e.preventDefault();
    toastGameTableIdRef.current = toast.loading("Creating your game table", {
      id: toastGameTableIdRef.current,
    });

    mutate({ name });
  };

  return (
<div className="flex min-w-full  bg-white rounded-lg border border-gray-300 text-white mx-8 my-4 px-4 py-2 shadow-lg  items-center justify-between">
  <form onSubmit={submitGameTable} className="flex items-center space-x-2">
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      variant="standard"
    >
      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mr-2"
        
      />
    </FormControl>
    <Button type="submit">Add a new table</Button>
  </form>
</div>

  );
}
