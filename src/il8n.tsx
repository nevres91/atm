import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          description: {
            part1: "Cash WIthdrawal",
            part2: "Deposit",
            part3: "Transfer",
            part4: "Balance",
            part5: "Withdrawal",
            part6: "You're about to withdraw:",
            part7: "Please Confirm.",
            part8: "Confirm",
            part9: "Back",
            part10: "Terminal fee is",
            part11: "Please Take Your Money!",
            part12: "Please Take Your Receipt!",
            part13: "Please Take Out Your Card!",
            part14: "Your final balance is:",
            part15: "Your Current Balance is:",
            part16: "Your amount to deposit is:",
            part17: "Add More",
            part18: "Please Insert Your Money.",
            part19: "Recipient's Card Number",
            part20: "Please Enter Recepient's Card Number",
            part21: "Amount",
            part22: "Processing",
            part23: "Your Receipt is ready!",
            part24: "What would you like to do?",
          },
        },
      },
      de: {
        translation: {
          // here we will place our translations...
          description: {
            part1: "Bargeldabhebung",
            part2: "Geld einzahlen",
            part3: "überweisen",
            part4: "Kontostand",
            part5: "die Abhebung",
            part6: "Sie möchten abheben:",
            part7: "Bitte bestätigen.",
            part8: "Bestätigen",
            part9: "Zurück",
            part10: "Die Terminalgebühr beträgt",
            part11: "Bitte nehmen Sie Ihr Geld!",
            part12: "Bitte nehmen Sie Ihre Quittung mit!",
            part13: "Bitte nehmen Sie Ihre Karte heraus!",
            part14: "Ihr endgültiger Saldo lautet:",
            part15: "Ihr aktueller Kontostand beträgt:",
            part16: "Ihr einzuzahlender Betrag beträgt:",
            part17: "Mehr hinzufügen",
            part18: "Bitte werfen Sie Ihr Geld ein.",
            part19: "Kartennummer des Empfängers",
            part20: "Bitte geben Sie die Kartennummer des Empfängers ein",
            part21: "Menge",
            part22: "Wird bearbeitet",
            part23: "Ihre Quittung ist fertig!",
            part24: "Was würdest du gern tun?",
          },
        },
      },
      slo: {
        translation: {
          // here we will place our translations...
          description: {
            part1: "Dvig gotovine",
            part2: "Depozit",
            part3: "Prenesi denar",
            part4: "stanje na računu",
            part5: "Dvig denarja",
            part6: "Kmalu se boste umaknili:",
            part7: "Prosim Potrdite.",
            part8: "Potrdi",
            part9: "Nazaj",
            part10: "Terminalska pristojbina je",
            part11: "Prosim, vzemite svoj denar!",
            part12: "Prosimo, vzemite račun!",
            part13: "Prosim, vzemite svojo kartico!",
            part14: "Vaše končno stanje je:",
            part15: "Vaše trenutno stanje je:",
            part16: "Vaš znesek za nakazilo je:",
            part17: "Dodaj Več",
            part18: "Prosimo, vstavite svoj denar.",
            part19: "Številka kartice prejemnika",
            part20: "Vnesite številko kartice prejemnika",
            part21: "Znesek",
            part22: "Obravnavati",
            part23: "Vaše potrdilo je pripravljeno!",
            part24: "Kaj bi rad počel?",
          },
        },
      },
      bih: {
        translation: {
          // here we will place our translations...
          description: {
            part1: "Podigni Novac",
            part2: "Uplati Novac",
            part3: "Pošalji",
            part4: "Stanje Računa",
            part5: "Podizanje Novca",
            part6: "Želite podići:",
            part7: "Molimo Potvrdite",
            part8: "Potvrdi",
            part9: "Nazad",
            part10: "Naknada iznosi",
            part11: "Molimo uzmite svoj novac!",
            part12: "Molimo uzmite račun!",
            part13: "Molimo izvadite svoju karticu!",
            part14: "Vaš konačni saldo iznosi:",
            part15: "Vaš trenutni saldo iznosi:",
            part16: "Iznos koji želite uplatiti je:",
            part17: "Dodaj još",
            part18: "Molimo vas ubacite novac.",
            part19: "Broj kartice primaoca",
            part20: "Molimo upušite broj kartice primaoca.",
            part21: "Količina",
            part22: "Procesuiram",
            part23: "Vaš račun je spreman.",
            part24: "Koju radnju želite?",
          },
        },
      },
    },
  });

export default i18n;
