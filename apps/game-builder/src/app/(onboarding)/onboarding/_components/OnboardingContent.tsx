"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/interface/customType";
import Button from "@/components/common/button/Button";

export default function OnboardingContent({ user }: { user: User }) {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const ANSWERS = ["네", "너무 생겨요"];

  const buttonClick = (text: string) => {
    setAnswer(text);
  };

  const goToMain = () => {
    router.push("/game-list");
  };

  return (
    <>
      <div className="flex-1">
        <p>
          안녕하세요.
          <br />
          ChooseTale을 설치해주셔서 감사합니다.
          <br />
          <br />
          게임을 사용하기에 앞서 간단하게 설명을 해드릴게요.
          <br />
          ChooseTale은 당신이 원하는대로 게임의 엔딩을 지을 수 있어요.
          <br />
          또한, 당신의 상상을 잔뜩 발휘해서 게임을 제작할 수도 있죠.
          <br />
          <br />
          어때요. 관심이 생기시나요?
        </p>
        {answer && (
          <p>
            {user.nickname}은(는) &ldquo;{answer}&rdquo;라고 답했다.
            <br />
            <br />
            좋아요. 이야기가 가득한 곳으로 초대합니다.
            <br />
            <br />
            재미있게 즐기시고, 언제 어디서나 다시 생각이 나시면 찾아 주세요.
          </p>
        )}
      </div>

      <div className="w-full flex flex-col gap-3">
        {!answer &&
          ANSWERS.map((text) => (
            <Button
              key={text}
              buttonText={text}
              dark
              className="min-h-[3.125rem]"
              onClick={() => buttonClick(text)}
            />
          ))}
        {answer && (
          <Button
            buttonText="입장하기"
            className="min-h-[3.125rem]"
            onClick={goToMain}
          />
        )}
      </div>
    </>
  );
}
