import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdClose } from "react-icons/md"

import type { Lang } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"

import { isLangRightToLeft } from "@/lib/utils/translations"

import Emoji from "./Emoji"

export type TranslationBannerProps = {
  shouldShow: boolean
  originalPagePath: string
  isPageContentEnglish: boolean
}

const TranslationBanner = ({
  shouldShow,
  originalPagePath,
  isPageContentEnglish,
}: TranslationBannerProps) => {
  const [isOpen, setIsOpen] = useState(shouldShow)
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const dir = isLangRightToLeft(locale! as Lang) ? "rtl" : "ltr"

  useEffect(() => {
    setIsOpen(shouldShow)
  }, [originalPagePath, shouldShow])

  const headerTextId = isPageContentEnglish
    ? "translation-banner-title-new"
    : "translation-banner-title-update"

  const bodyTextId = isPageContentEnglish
    ? "translation-banner-body-new"
    : "translation-banner-body-update"

  if (!isOpen) return null

  return (
    <aside className="fixed bottom-0 end-0 z-50 md:bottom-8 md:end-8" dir={dir}>
      <div className="bg-info-banner relative max-h-full max-w-full p-4 text-neutral-900 shadow-md md:max-w-[600px] md:rounded-sm">
        <Flex className="m-4 mt-10 flex-col sm:mt-4">
          <Flex className="mb-4 flex-col-reverse items-start sm:flex-row sm:items-center">
            <h3 className="my-0 text-2xl font-bold leading-none">
              {t(headerTextId)}
            </h3>
            <Emoji
              text=":globe_showing_asia_australia:"
              className="mb-4 ms-2 text-2xl sm:mb-auto"
            />
          </Flex>
          <p>{t(bodyTextId)}</p>
          <Flex className="flex-col items-start sm:flex-row sm:items-center">
            <div>
              <Button asChild variant="solid">
                <Link href="/contributing/translation-program/">
                  {t("translation-banner-button-translate-page")}
                </Link>
              </Button>
            </div>
            {/* Todo: Reimplement once fixed */}
            {/* Issue: https://github.com/ethereum/ethereum-org-website/issues/12292 */}
            {/* {!isPageContentEnglish && (
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="ms-0 sm:ms-2 mt-2 sm:mt-0 border-neutral-900 text-neutral-900"
                >
                  <a href={originalPagePath} lang={DEFAULT_LOCALE}>
                    {t("translation-banner-button-see-english")}
                  </a>
                </Button>
              </div>
            )} */}
          </Flex>
        </Flex>
        <Button
          variant="ghost"
          size="sm"
          className="absolute end-0 top-0 m-2 hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          <MdClose className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </aside>
  )
}

export default TranslationBanner
