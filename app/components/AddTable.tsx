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
    <div className="flex">
      <form onSubmit={submitGameTable}>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          variant="standard"
          onSubmit={submitGameTable}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2"
          />
          <Button type="submit">Add a new table</Button>
        </FormControl>
      </form>
      <br />
    </div>
  );
}
