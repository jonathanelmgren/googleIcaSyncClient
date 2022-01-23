import React from 'react'
import { StepGuide } from '../../components/StepGuide'

export const Terms = () => {
	return (
		<div>
			<p>Genom att använda denna tjänsten är du medveten om att dina inloggningsuppgifter kan lagras krypterat på en databas om du väljer automatisk uppdatering av token.</p>
			<p>Jag avsäger mig allt ansvar kring denna tjänsten och vad det innebär</p>
			<p>Denna tjänst skapades för eget bruk men av godvilja erbjuder jag nu den till andra kostnadsfritt (ev driftkostnader vid användning av tjänsten)</p>
			<p>Du får fritt använda koden till eget bruk och sätta upp en server hos dig.</p>
			<p>
				Koden är open source och hittas på: <a href='https://github.com/jonathanelmgren/googleIcaSyncClient'>https://github.com/jonathanelmgren/googleIcaSyncClient</a> samt <a href='https://github.com/jonathanelmgren/googleIcaSyncServer'>https://github.com/jonathanelmgren/googleIcaSyncServer</a>
			</p>
			<p>Principen är att er inköpslista delas med ett "master" konto på Google som har samma namn som ert ID ni blir tilldelade. På så sätt slipper ni ge ut information om ert Google konto.</p>
			<p>Detta synkas sedan mot inloggningsuppgifterna hos ICA och skapar en ny inköpslista med samma namn. När denna är skapad är det fritt fram att byta namn på inköpslistan på ICA men det är viktigt att inköpslistan på Google fortfarande har samma namn som ert tilldelade ID.</p>
			<p>
				Tjänsten använder sig utav ett <bold>inofficiellt</bold> API mot ICA som är skapat av Sven Dahlstrand och hittas på <a href='https://github.com/svendahlstrand/ica-api'>https://github.com/svendahlstrand/ica-api</a>
			</p>
			<p>Skillnaden på automatisk och manuell är att den automatiska sparar dina ICA-uppgifter för att automatiskt uppdatera en så kallad Token (som då används för att göra API-anrop och hämta/lägga till data i din inköpslista hos ICA.). Den manuella hämtar denna så kallade token och sparar ej dina inloggningsuppgifter. Denna token har ett utgångsdatum och du behöver göra om denna processen då och då om du väljer manuell approach.</p>
			<p>Är det något som strular för er kan ni kontakta mig på jonathan@elmgren.dev</p>
			<h3>GUIDE:</h3>
			<StepGuide />
		</div>
	)
}
