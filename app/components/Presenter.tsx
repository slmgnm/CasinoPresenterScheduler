"use client";
import DeletePresenter from "./DeletePresenter";
import { Avatar, Divider, Typography } from "@mui/material";
import EditPresenter from "./EditPresenter";
import { motion } from "framer-motion";
import { useState } from "react";
export default function Presenter({ name, id }: any) {
  return (
    <>
      <div className="flex justify-between items-center  rounded-lg border border-gray-300 my-1">
        <div className="flex items-center space-x-2 mx-3  ">
          <Avatar>{name?.charAt(0)}</Avatar>
          <Typography
            className="text-white-700"
            sx={{ display: "inline" }}
            component="span"
            variant="body1"
            color="white"
          >
            {name}
          </Typography>
        </div>
        <div className="flex  items-center space-x-2 mx-3 ">
          <EditPresenter name={name} id={id} />
          <DeletePresenter name={name} id={id} />
        </div>
      </div>
    </>
  );
}
