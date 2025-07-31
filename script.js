// Skript pro webovou aplikaci "Výměr rychlosti"

// Funkce pro výpočet rychlosti
function calculateSpeed(rpm, wheelDiameter, gearRatio, finalDrive, tireWidth, tireProfile) {
    // Výpočet převodového poměru s stálým převodem
    const totalRatio = gearRatio * finalDrive;
    
    // Výpočet průměru kola z velikosti ráfku (R10-R22) v palcích na mm
    // Předpokládáme, že zadaná hodnota je velikost ráfku v palcích
    const rimDiameter = wheelDiameter * 25.4; // převod palců na mm
    
    // Výpočet výšky pneu
    const tireHeight = tireWidth * (tireProfile / 100);
    
    // Výpočet celkového průměru kola včetně pneu
    const totalWheelDiameter = rimDiameter + (2 * tireHeight);
    
    // Výpočet obvodu kola (v mm)
    const wheelCircumference = Math.PI * totalWheelDiameter;
    
    // Výpočet rychlosti (v km/h)
    // (otáčky * obvod kola * 60) / (převod * 1000000)
    const speed = (rpm * wheelCircumference * 60) / (totalRatio * 1000000);
    
    return speed;
}

// Funkce pro zaokrouhlení podle zvolené přesnosti
function roundToPrecision(value, precision) {
    const factor = 1 / precision;
    return Math.round(value * factor) / factor;
}

// Hlavní výpočetní funkce
function performCalculation() {
    // Získání hodnot z formuláře
    const rpm = parseFloat(document.getElementById('otacky').value);
    const wheelDiameter = parseFloat(document.getElementById('prumer-kol').value);
    const gearRatio = parseFloat(document.getElementById('prevodovy-pomer').value);
    const finalDrive = parseFloat(document.getElementById('staly-prevod').value);
    const tireWidth = parseFloat(document.getElementById('sirka-pneu').value);
    const tireProfile = parseFloat(document.getElementById('profil-pneu').value);
    
    // Kontrola platnosti vstupů
    if (isNaN(rpm) || isNaN(wheelDiameter) || isNaN(gearRatio) || 
        isNaN(finalDrive) || isNaN(tireWidth) || isNaN(tireProfile)) {
        alert('Prosím, vyplňte všechna pole platnými čísly.');
        return;
    }
    
    // Získání zvolené přesnosti
    const precisionElements = document.getElementsByName('presnost');
    let precision = 1;
    for (let i = 0; i < precisionElements.length; i++) {
        if (precisionElements[i].checked) {
            precision = parseFloat(precisionElements[i].value);
            break;
        }
    }
    
    // Výpočet rychlosti
    const speed = calculateSpeed(rpm, wheelDiameter, gearRatio, finalDrive, tireWidth, tireProfile);
    
    // Zaokrouhlení podle zvolené přesnosti
    const roundedSpeed = roundToPrecision(speed, precision);
    
    // Zobrazení výsledku
    document.getElementById('result-value').textContent = roundedSpeed + ' km/h';
    document.getElementById('result').classList.remove('hidden');
}

// Funkce pro závodní výpočet
function performRaceCalculation() {
    // Získání hodnot z formuláře
    const rpm = parseFloat(document.getElementById('race-otacky').value);
    const gearRatio = parseFloat(document.getElementById('race-prevod').value);
    const wheelDiameter = parseFloat(document.getElementById('race-prumer-pneu').value);
    const finalDrive = parseFloat(document.getElementById('race-staly-prevod').value);
    
    // Kontrola platnosti vstupů
    if (isNaN(rpm) || isNaN(gearRatio) || isNaN(wheelDiameter) || isNaN(finalDrive)) {
        alert('Prosím, vyplňte všechna pole platnými čísly.');
        return;
    }
    
    // Zjednodušený výpočet pro závodní režim
    // Předpokládáme standardní hodnoty pro kola a pneumatiky
    const tireWidth = 165; // mm
    const tireProfile = 80; // %
    
    const speed = calculateSpeed(rpm, wheelDiameter, gearRatio, finalDrive, tireWidth, tireProfile);
    
    // Zobrazení výsledku (vždy s přesností na desetiny)
    const roundedSpeed = roundToPrecision(speed, 0.1);
    document.getElementById('race-result-value').textContent = roundedSpeed + ' km/h';
    document.getElementById('race-result').classList.remove('hidden');
}

// Funkce pro tisk
function printPage() {
    window.print();
}

// Funkce pro nastavení vzhledu stránky
function pageSetup() {
    alert('Funkce "Vzhled stránky" byla vyvolána. V reálné aplikaci by se zde otevřelo nastavení tisku.');
}

// Funkce pro zobrazení/skrytí modálních oken
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Uložení nastavení do localStorage
function saveSettings() {
    const settings = {
        otacky: document.getElementById('otacky').value,
        prumerKol: document.getElementById('prumer-kol').value,
        prevodovyPomer: document.getElementById('prevodovy-pomer').value,
        stalyPrevod: document.getElementById('staly-prevod').value,
        sirkaPneu: document.getElementById('sirka-pneu').value,
        profilPneu: document.getElementById('profil-pneu').value,
        presnost: document.querySelector('input[name="presnost"]:checked').value
    };
    
    localStorage.setItem('speedCalculatorSettings', JSON.stringify(settings));
}

// Načtení nastavení z localStorage
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('speedCalculatorSettings'));
    
    if (settings) {
        document.getElementById('otacky').value = settings.otacky || '';
        document.getElementById('prumer-kol').value = settings.prumerKol || '';
        document.getElementById('prevodovy-pomer').value = settings.prevodovyPomer || '';
        document.getElementById('staly-prevod').value = settings.stalyPrevod || '';
        document.getElementById('sirka-pneu').value = settings.sirkaPneu || '';
        document.getElementById('profil-pneu').value = settings.profilPneu || '';
        
        // Nastavení přesnosti
        const precisionElements = document.getElementsByName('presnost');
        for (let i = 0; i < precisionElements.length; i++) {
            if (precisionElements[i].value === settings.presnost) {
                precisionElements[i].checked = true;
                break;
            }
        }
    }
}

// Export do CSV
function exportToCSV() {
    // Získání dat pro export
    const rpm = document.getElementById('otacky').value;
    const wheelDiameter = document.getElementById('prumer-kol').value;
    const gearRatio = document.getElementById('prevodovy-pomer').value;
    const finalDrive = document.getElementById('staly-prevod').value;
    const tireWidth = document.getElementById('sirka-pneu').value;
    const tireProfile = document.getElementById('profil-pneu').value;
    const result = document.getElementById('result-value').textContent;
    
    // Vytvoření CSV obsahu
    const csvContent = "data:text/csv;charset=utf-8," +
        "Parametr,Hodnota\n" +
        "Otáčky motoru," + rpm + "\n" +
        "Velikost kola (R10-R22)," + wheelDiameter + "\n" +
        "Převodový poměr," + gearRatio + "\n" +
        "Stálý převod," + finalDrive + "\n" +
        "Šířka pneu," + tireWidth + "\n" +
        "Profil pneu," + tireProfile + "\n" +
        "Výsledek," + result;
    
    // Vytvoření odkazu pro stažení
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "vypocet_rychlosti.csv");
    document.body.appendChild(link);
    
    // Simulace kliknutí na odkaz
    link.click();
    
    // Odstranění odkazu
    document.body.removeChild(link);
}

// Export do PDF (jednoduchá verze pomocí tisku)
function exportToPDF() {
    // V reálné aplikaci by se použila knihovna jako jsPDF
    // Pro jednoduchost použijeme tisk s nastavením PDF jako výstupu
    printPage();
}

// Při načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    // Načtení uložených nastavení
    loadSettings();
    
    // Přidání event listenerů pro tlačítka
    document.getElementById('calculate-btn').addEventListener('click', performCalculation);
    document.getElementById('close-btn').addEventListener('click', function() {
        saveSettings();
        window.close(); // Pokus o zavření okna (funguje pouze v některých prohlížečích)
    });
    
    // Přidání event listenerů pro menu
    document.getElementById('print-link').addEventListener('click', printPage);
    document.getElementById('page-setup-link').addEventListener('click', pageSetup);
    document.getElementById('race-calc-link').addEventListener('click', function() {
        showModal('race-modal');
    });
    document.getElementById('info-link').addEventListener('click', function() {
        showModal('info-modal');
    });
    
    // Přidání event listenerů pro modální okna
    document.querySelectorAll('.modal .close').forEach(function(element) {
        element.addEventListener('click', function() {
            closeModal(this.closest('.modal').id);
        });
    });
    
    document.getElementById('close-info-btn').addEventListener('click', function() {
        closeModal('info-modal');
    });
    
    // Přidání event listenerů pro závodní výpočet
    document.getElementById('race-calculate-btn').addEventListener('click', performRaceCalculation);
    document.getElementById('race-close-btn').addEventListener('click', function() {
        closeModal('race-modal');
    });
    
    // Uložení nastavení při opuštění stránky
    window.addEventListener('beforeunload', saveSettings);
});
