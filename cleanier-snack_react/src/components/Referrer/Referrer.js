// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

// export const REFERRER_KEY = "referrer";
// export const REFERRER_KEYWORDS_KEY = "referrerKeywords";

// export function parseQueryString(qs: string) {
//   const obj: Record<string, string> = {};
//   const entries = new URLSearchParams(qs).entries();
//   for (const [key, value] of entries) {
//     obj[key] = value;
//   }
//   return obj;
// }

// export default function useReferrer() {
//   const router = useRouter();

//   const [referrer, setReferrer] = (useState < string) | (null > null);
//   const [isReferrerChanged, setReferrerChanged] = useState(false);
//   const [referrerKeywords, setReferrerKeywords] =
//     (useState < string) | (null > null);
//   const [isReferrerKeywordsChanged, setReferrerKeywordsChanged] =
//     useState(false);

//   useIsomorphicLayoutEffect(() => {
//     // 기존에 저장된 레퍼러 및 레퍼러 키워드 존재 유무 파악
//     const hasReferrer = !!sessionStorage.getItem(REFERRER_KEY);
//     const hasReferrerKeywords = !!sessionStorage.getItem(REFERRER_KEYWORDS_KEY);

//     // 레퍼러 추출 및 저장
//     if (!hasReferrer) {
//       const referrer = document.referrer;
//       const isGoogle = referrer.includes("google");
//       const isNaverBlog = referrer.includes("blog.naver");
//       const isNaver = referrer.includes("naver");
//       const isFacebook = referrer.includes("facebook");
//       const isInstagram =
//         referrer.includes("linktr") || referrer.includes("instagram");
//       const isDirectOrLink = referrer.length === 0;
//       sessionStorage.setItem(
//         REFERRER_KEY,
//         isGoogle
//           ? "구글"
//           : isNaverBlog
//           ? "네이버 블로그"
//           : isNaver
//           ? "네이버"
//           : isFacebook
//           ? "페이스북"
//           : isInstagram
//           ? "인스타그램"
//           : isDirectOrLink
//           ? "링크(또는 직접입력)"
//           : referrer
//       );
//       setReferrerChanged(true);
//     }

//     // 레퍼러 키워드 추출 및 저장
//     if (!hasReferrerKeywords) {
//       const referrerQueryParams = parseQueryString(document.referrer);
//       const keys = Object.keys(referrerQueryParams);
//       if (keys.length > 0) {
//         const values: string[] = [];
//         keys.forEach((key) => {
//           if (/(q|query|search)+$/gi.test(key)) {
//             values.push(referrerQueryParams[key]);
//           }
//         });
//         if (values.length > 0) {
//           sessionStorage.setItem(REFERRER_KEYWORDS_KEY, values.join(", "));
//           setReferrerKeywordsChanged(true);
//         }
//       }
//     }
//   }, [router.asPath]);

//   useEffect(() => {
//     setReferrer(sessionStorage.getItem(REFERRER_KEY));
//   }, [isReferrerChanged]);

//   useEffect(() => {
//     setReferrerKeywords(sessionStorage.getItem(REFERRER_KEYWORDS_KEY));
//   }, [isReferrerKeywordsChanged]);

//   return { referrer, referrerKeywords };
// }
