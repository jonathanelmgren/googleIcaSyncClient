import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../shared/providers/UserProvider'

export const StepGuide = () => {
	const [authenticatedUser] = useContext(UserContext)
	const id = authenticatedUser ? authenticatedUser._id : 'Du blir tilldelad detta när du är inloggad'
	return (
		<div>
			<div>
				<h3>Steg 1:</h3>
				<p>2. Ta din primära Google Shoppinglist (den inköpslistan som är kopplad till din Google Assistent) och döp om den till: {id}</p>
				<p>3. Dela denna listan med: googleicasync@elmgren.dev</p>
			</div>
			<div>
				<h3>Steg 2:</h3>
				<p>Skriv in ditt användarnamn och lösenord till ICA. Lösenordet till ICA hittar du på tidningen buffé som ICA skickar ut. Du kan också kontakta kundtjänst och be dem skicka ut ett lösenord. Du kan även byta lösenordet själv genom att surfa in på ICAs hemsida, klicka "Logga in", Välj sedan "Lösenord" och klicka i "Glömt lösenordet".</p>
				<p>För att verifiera att ditt användarnamn och lösenord är korrekt så kan du bara försöka logga in på ICA med dina uppgifter</p>
				<p>Väljer du automatisk uppdatering sparas dina inloggningsuppgifter på ett säkert och krypterat sätt.</p>
				<bold>Tänk på att du ger nu mig eventuell tillgång till ditt konto, detta skes på egen risk.</bold>
				<p>När du sparat dina uppgifter så kommer det att skapas en ny inköpslista på ICA som har namn: {id}</p>
				<p>Så fort denna inköpslista är skapad kan du byta namn på den.</p>
			</div>
			<div>
				<h3>Steg 3:</h3>
				<p>För att denna sidan skall ligga uppe måste både kod och servrar underhållas och bekostas, därför tänkte jag mig ett "Pay what you want"-system. Ni swishar valfri summa till mig så får ni en månad av denna tjänsten :). Glöm ej att skriva ditt ID eller användarnamn i meddelande-fältet. Men glöm inte av att ni får en 7-dagars provperiod.</p>
                <p>Swish: 0706943349</p>
				<p>Om ni ej vill betala så kan ni även ladda ned källkoden och köra den lokalt hos er:</p>
				<a href='https://github.com/jonathanelmgren/googleIcaSyncClient'>GitHub - Client </a> <br />
				<a href='https://github.com/jonathanelmgren/googleIcaSyncServer'>GitHub - Server</a>
				<p>Skillnaden på automatisk och manuell är att den automatiska sparar dina ICA-uppgifter för att automatiskt uppdatera en så kallad Token (som då används för att göra API-anrop och hämta/lägga till data i din inköpslista hos ICA.). Den manuella hämtar denna så kallade token och sparar ej dina inloggningsuppgifter. Denna token har ett utgångsdatum och du behöver göra om denna processen då och då om du väljer manuell approach.</p>
			</div>
		</div>
	)
}
