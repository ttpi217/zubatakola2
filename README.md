# Webová aplikace "Výměr rychlosti"

Tato webová aplikace je moderní implementace původního Windows EXE programu "Výměr rychlosti" (autorychl.exe) verze 5.4.4.4 od Marka Freemana.

## Funkce aplikace

Aplikace umožňuje výpočet rychlosti automobilu na základě zadaných parametrů:

- Otáčky motoru
- Průměr kol
- Převodový poměr
- Počet zubů na převodovce
- Šířka a výška profilu pneumatiky

Uživatel si může zvolit přesnost výsledku:
- Po jednotkách
- Po desetinách
- Po setinách
- Po tisícinách

### Speciální funkce

- **Závodní výpočet** - speciální režim pro závodní nastavení
- **Tisk výsledků** - možnost vytisknout výsledky výpočtu
- **Uložení nastavení** - automatické ukládání posledních zadaných hodnot
- **Export do CSV** - export výsledků do CSV souboru
- **Responzivní design** - aplikace funguje na desktopu, tabletu i mobilu

## Technologie

- HTML5
- CSS3
- JavaScript (ES6+)

## Spuštění aplikace

1. Otevřete soubor `index.html` v libovolném moderním webovém prohlížeči (Chrome, Firefox, Edge).

2. Alternativně můžete použít jednoduchý HTTP server:
   ```bash
   # Pokud máte nainstalovaný Python 3
   python -m http.server 8000
   
   # Nebo s Python 2
   python -m SimpleHTTPServer 8000
   
   # Poté otevřete v prohlížeči http://localhost:8000
   ```

## Struktura projektu

```
web/
├── index.html      # Hlavní HTML soubor
├── styles.css      # Styly aplikace
├── script.js       # JavaScriptová logika
└── README.md       # Tento soubor
```

## Použití

1. Vyplňte vstupní parametry v hlavním formuláři
2. Zvolte přesnost výsledku
3. Klikněte na tlačítko "Výsledek"
4. Výsledek se zobrazí pod formulářem

Pro závodní výpočet použijte položku v menu "Soubor" -> "Závodní výpočet".

## Uložená nastavení

Aplikace automaticky ukládá poslední zadané hodnoty do localStorage prohlížeče. Při příštím otevření aplikace se tyto hodnoty automaticky načtou.

## Export dat

Výsledky lze exportovat do CSV souboru pomocí funkce tisku a volby tisk do souboru.

## Vývoj

Pro úpravy aplikace stačí upravit příslušné soubory:
- `index.html` pro změnu struktury
- `styles.css` pro změnu vzhledu
- `script.js` pro změnu logiky

## Licenční ujednání

Tato aplikace je vytvořena jako edukativní projekt a nemá komerční účel. Reprodukuje funkce původního programu "Výměr rychlosti" (autorychl.exe) pouze pro demonstrační účely.
