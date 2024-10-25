"use client";
import Image from "next/image";
import { type ChoosenPage } from "@/interface/customType";
import { removeEditorTags } from "@/utils/removeEditorTags";
import penIcon from "@asset/icons/pen.png";

export default function GamePlayChoosenPages({ page }: { page: ChoosenPage }) {
  return (
    <>
      <p className="keep-all">{removeEditorTags(page.abridgement)}</p>
      <ul>
        {page.choices.map((choice) => (
          <li key={choice.id} className="flex justify-between gap-2 mb-3 mt-10">
            <Image
              src={penIcon}
              width={16}
              height={16}
              className="mt-1 w-4 h-4 grow-0 shirnk-0"
              alt="choice"
            />
            <span className="flex-1">{choice.title}</span>
            <span>{(choice.percentage * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </>
  );
}
