import { Suspense } from "react";
import ClientWords from "@/components/homeRD/ClientWords";
import ClientVideos from "@/components/homeRD/ClientVideos";
import MainFooter from "@/components/MainFooter";
import SuccessStoriesHero from "@/components/success-stories/success-stories-hero";
import SuccessStoriesToolbar from "@/components/success-stories/success-stories-toolbar";
import SuccessStoriesGrid from "@/components/success-stories/success-stories-grid";
import { client } from "@/lib/sanity/client";
import ReadyToBuild from "@/components/shared/ReadyToBuild";
import {
  successStoriesQueryAsc,
  successStoriesQueryDesc,
  successStoryCountQuery,
  allSuccessStoryCategoriesQuery,
} from "@/lib/sanity/queries";
import type {
  SanitySuccessStory,
  SuccessStoryCategory,
} from "@/types/success-story";

const STORIES_PER_PAGE = 9;

interface SuccessStoriesFragmentProps {
  search?: string;
  sort?: string;
  category?: string;
  page?: string;
}

export default async function About({
  search: rawSearch,
  sort: rawSort,
  category: rawCategory,
  page: rawPage,
}: SuccessStoriesFragmentProps = {}) {
  const search = rawSearch ?? "";
  const sort = rawSort === "asc" ? "asc" : "desc";
  const category = rawCategory ?? "";
  const page = Math.max(1, parseInt(rawPage ?? "1", 10) || 1);
  const offset = (page - 1) * STORIES_PER_PAGE;

  const storiesQuery =
    sort === "asc" ? successStoriesQueryAsc : successStoriesQueryDesc;

  const [stories, totalCount, categories] = await Promise.all([
    client.fetch<SanitySuccessStory[]>(storiesQuery, {
      category,
      search: search ? `${search}*` : "",
      offset,
      limit: offset + STORIES_PER_PAGE,
    }),
    client.fetch<number>(successStoryCountQuery, {
      category,
      search: search ? `${search}*` : "",
    }),
    client.fetch<SuccessStoryCategory[]>(allSuccessStoryCategoriesQuery),
  ]);

  const totalPages = Math.ceil(totalCount / STORIES_PER_PAGE);

  const successVideos = [
    {
      videoUrl: "https://youtu.be/NeVJwPh3GZ0",
      id: 1,
    },
    {
      videoUrl: "https://youtu.be/ze9eSdRedt0",
      id: 2,
    },
    {
      videoUrl: "https://youtu.be/aN_0I5tN5Eo",
      id: 3,
    },
    {
      videoUrl: "https://youtu.be/_Vx_xNe4TdA",
      id: 4,
    },
    {
      videoUrl: "https://youtu.be/p5F-iGADZRI",
      id: 5,
    },
  ];

  const testimonials = [
    {
      name: "Robert Jordan",
      company: "Puroclean of Lynwood",
      location: "Washington, USA",
      companyLogo: "/clients/puroclean-icon.png",
      quote:
        "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella.",
      thankYou: "Thank you!",
    },
    {
      quote:
        "Hiring from All Talentz has helped take a lot of pressure off, and allowed me to focus more on administrative tasks, it's been fantastic so far",
      name: "Bryan Towne",
      company: "Puroclean of Lynwood",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella.",
      name: "Robert Jordan",
      company: "Puroclean of Lynwood",
      location: "Puroclean of Lynwood, Washington, USA",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "The reliability, accountability, accuracy and communication style at All Talentz has been very top notch.",
      name: "Johnetta Johnson",
      location: "SVP Operations, Alacrity Solutions.",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "The reliability, accountability, accuracy and communication style at All Talentz has been very top notch.",
      name: "Craig Hawkins",
      location: "Owner, Puroclean of Redmond",
      company: "Puroclean of Lynwood",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
      name: "Robert Jordan",
      location: "Puroclean of Lynwood, Washington, USA",
      company: "Puroclean of Lynwood",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "It's been amazing; I appreciate the tenacity and the focus and the drive to keep learning and growing and getting things done",
      name: "Jenny Hawkins",
      location: "Puroclean of Redmond",
      company: "Puroclean of Redmond",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "Hiring from All Talentz has helped take a lot of pressure off, and allowed me to focus more on administrative tasks, it's been fantastic so far",
      name: "Bryan Towne",
      location: "Puroclean of Burlington, USA",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
      name: "Robert Jordan",
      location: "Puroclean of Lynwood, Washington, USA",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
      name: "Robert Jordan",
      location: "Puroclean of Lynwood, Washington, USA",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
    {
      quote:
        "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
      name: "Robert Jordan",
      location: "Puroclean of Lynwood, Washington, USA",
      companyLogo: "/clients/puroclean-icon.png",
      thankYou: "Thank you!",
    },
  ];

  return (
    <>
      <SuccessStoriesHero />

      <Suspense>
        <SuccessStoriesToolbar
          categories={categories}
          currentSearch={search}
          currentCategory={category}
        />
      </Suspense>
      <SuccessStoriesGrid
        stories={stories}
        categories={categories}
        search={search}
        category={category}
        currentPage={page}
        totalPages={totalPages}
      />

      <ReadyToBuild/>
    </>
  );
}
