import { NavigationData, PageData } from './payload-types';

export const getNavigation = async () => {
  try {
    return fetch(`${process.env.SITE_HOST}/api/globals/navigation`)
      .then(res => res.json())
      .then(res => (res || {}) as NavigationData);
  } catch {
    return {};
  }
}

export const getAllPages = async (draftMode = false) => {
  try {
    return fetch(`${process.env.SITE_HOST}/api/page${!draftMode && '?where[_status][equals]=published'}`)
      .then(res => res.json())
      .then(res => (res?.docs || []) as PageData[]);
  } catch {
    return [];
  }
}

export const getPagesBySlug = async (pageSlug: string, draftMode = false) => {
  try {
    return fetch(`${process.env.SITE_HOST}/api/page/by-slug/${pageSlug}?draft=${draftMode}`)
      .then(res => res.json())
      .then(res => (res?.docs || []) as PageData[]);
  } catch {
    return [];
  }
}

export const getPagesByParentId = async (parentId: string) => {
  try {
    return fetch(`${process.env.SITE_HOST}/api/page/by-parent/${parentId}`)
      .then(res => res.json())
      .then(res => (res?.docs || []) as PageData[]);
  } catch {
    return [];
  }
}