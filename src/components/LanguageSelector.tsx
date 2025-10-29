import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "हिंदी" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((language) => (
        <Button
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          variant={i18n.language === language.code ? "default" : "outline"}
          size="sm"
          className="h-7 text-xs rounded-full px-2"
        >
          {language.lang}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
