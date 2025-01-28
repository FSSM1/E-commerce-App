import React from "react";
import Button from "@mui/material/Button";

const Contact = () => {
  return (
    <div>
      <p>
        A paragraph is defined as “a group of sentences or a single sentence
        that forms a unit” (Lunsford and Connors 116). Length and appearance do
        not determine whether a section in a paper is a paragraph. For instance,
        in some styles of writing, particularly journalistic styles, a paragraph
        can be just one sentence long.
      </p>
      <Button variant="contained">Contained</Button>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          we love
        </h1>

        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-centent text-4xl font-bold tracking-widest ">
              compfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        It was their first date and she had been looking forward to it the
        entire week. She had her eyes on him for months, and it had taken a
        convoluted scheme with several friends to make it happen, but he'd
        finally taken the hint and asked her out. After all the time and effort
        she'd invested into it, she never thought that it would be anything but
        wonderful. It goes without saying that things didn't work out quite as
        she expected.
      </p>
    </div>
  );
};

export default Contact;
