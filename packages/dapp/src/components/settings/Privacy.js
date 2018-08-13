import React from 'react';
import { Card } from 'antd-mobile';
import { Constants } from '../Constants';
import { Privacy as PrivacyThumb } from '../../thumbs';

export class Privacy extends React.Component {
  render() {
    return (
      <Card full>
        <Card.Header
          title="Privacy"
          thumb={PrivacyThumb}
          extra={<span>10.11.2018</span>}
        />
        <Card.Body>
          <div className="desc">
            <p>
              <h2>Datenschutzerklärung</h2>
            </p>
            <p>
              <strong>Allgemeiner Hinweis und Pflichtinformationen</strong>
            </p>
            <p>
              <strong>Benennung der verantwortlichen Stelle</strong>
            </p>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </p>
            <p>
              <span>Asure Foundation i.G.</span>
              <br />
              <span>Paul Mizel</span>
              <br />
              <span>Elverdinckweg 14</span>
              <br />
              <span>44309</span>
              <span>Dortmund</span>
            </p>
            <br />
            <p>
              Die verantwortliche Stelle entscheidet allein oder gemeinsam mit
              anderen über die Zwecke und Mittel der Verarbeitung von
              personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).
            </p>
            <p>
              <strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung</strong>
            </p>
            <p>
              Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der
              Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten
              Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine
              formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
              unberührt.
            </p>
            <p>
              <strong>
                Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde
              </strong>
            </p>
            <p>
              Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen
              Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde
              zu. Zuständige Aufsichtsbehörde bezüglich datenschutzrechtlicher
              Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in
              dem sich der Sitz unseres Unternehmens befindet. Der folgende Link
              stellt eine Liste der Datenschutzbeauftragten sowie deren
              Kontaktdaten bereit:{' '}
              <a
                href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                target="_blank"
              >
                https://www.bfdi.bund.de
              </a>.
            </p>
            <p>
              <strong>Recht auf Datenübertragbarkeit</strong>
            </p>
            <p>
              Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer
              Einwilligung oder in Erfüllung eines Vertrags automatisiert
              verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die
              Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern
              Sie die direkte Übertragung der Daten an einen anderen
              Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch
              machbar ist.
            </p>
            <p>
              <strong>
                Recht auf Auskunft, Berichtigung, Sperrung, Löschung
              </strong>
            </p>
            <p>
              Sie haben jederzeit im Rahmen der geltenden gesetzlichen
              Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre
              gespeicherten personenbezogenen Daten, Herkunft der Daten, deren
              Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht
              auf Berichtigung, Sperrung oder Löschung dieser Daten.
              Diesbezüglich und auch zu weiteren Fragen zum Thema
              personenbezogene Daten können Sie sich jederzeit über die im
              Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.
            </p>
            <p>
              <strong>SSL- bzw. TLS-Verschlüsselung</strong>
            </p>
            <p>
              Aus Sicherheitsgründen und zum Schutz der Übertragung
              vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden,
              nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind
              Daten, die Sie über diese Website übermitteln, für Dritte nicht
              mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der
              „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der
              Browserzeile.
            </p>
            <p>
              <strong>Server-Log-Dateien</strong>
            </p>
            <p>
              In Server-Log-Dateien erhebt und speichert der Provider der
              Website automatisch Informationen, die Ihr Browser automatisch an
              uns übermittelt. Dies sind:
            </p>
            <ul>
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Es findet keine Zusammenführung dieser Daten mit anderen
              Datenquellen statt. Grundlage der Datenverarbeitung bildet Art. 6
              Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung
              eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
            </p>
            <p>
              <strong>Content-Delivery-Network von Cloudflare</strong>
            </p>
            <p>
              Wir setzen ein so genanntes Content Delivery Network (CDN),
              angeboten von Cloudflare, Inc., 101 Townsend St, San Francisco, CA
              94107, USA, ein. Cloudflare ist unter dem Privacy-Shield-Abkommen
              zertifiziert und bietet durch dieses eine Garantie, das
              europäische Datenschutzrecht einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt0000000GnZKAA0&status=Active">
                https://www.privacyshield.gov
              </a>).
            </p>
            <p>
              Ein CDN ist ein Online-Dienst, mit dessen Hilfe Inhalte unseres
              Onlineangebots, insbesondere Mediendateien, wie Grafiken,
              Stylesheets und Skripte mit Hilfe regional verteilter und über das
              Internet verbundener Server, schneller ausgeliefert werden. Die
              Verarbeitung der Daten der Nutzer erfolgt alleine zu den
              vorgenannten Zwecken und der Aufrechterhaltung der Sicherheit und
              Funktionsfähigkeit des CDN.
            </p>
            <p>
              Die Nutzung erfolgt auf Grundlage unserer berechtigten Interessen,
              d.h. Interesse an einer sicheren und effizienten Bereitstellung,
              Analyse sowie Optimierung unseres Onlineangebotes gem. Art. 6 Abs.
              1 lit. f. DSGVO zu Gunsten der Websitenbesucher.
            </p>
            <p>
              Weiterführende Informationen erhalten Sie in der
              Datenschutzerklärung von Cloudflare:{' '}
              <a href="https://www.cloudflare.com/security-policy">
                https://www.cloudflare.com/security-policy.
              </a>
            </p>
            <p>
              <strong>Abonnieren von Kommentaren</strong>
            </p>
            <p>
              Sie können als Nutzer unserer Website nach erfolgter Anmeldung
              Kommentare abonnieren. Mit einer Bestätigungs-E-Mail prüfen wir,
              ob Sie der Inhaber der angegebenen E-Mail-Adresse sind. Sie können
              die Abo-Funktion für Kommentare jederzeit über einen Link, der
              sich in einer Abo-Mail befindet, abbestellen. Zur Einrichtung des
              Abonnements eingegebene Daten werden im Falle der Abmeldung
              gelöscht. Sollten diese Daten für andere Zwecke und an anderer
              Stelle an uns übermittelt worden sein, verbleiben diese weiterhin
              bei uns.
            </p>
            <p>
              <strong>Newsletter-Daten</strong>
            </p>
            <p>
              Zum Versenden unseres Newsletters benötigen wir von Ihnen eine
              E-Mail-Adresse. Eine Verifizierung der angegebenen E-Mail-Adresse
              ist notwendig und der Empfang des Newsletters ist einzuwilligen.
              Ergänzende Daten werden nicht erhoben oder sind freiwillig. Die
              Verwendung der Daten erfolgt ausschließlich für den Versand des
              Newsletters.
            </p>
            <p>
              Die bei der Newsletteranmeldung gemachten Daten werden
              ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1
              lit. a DSGVO) verarbeitet. Ein Widerruf Ihrer bereits erteilten
              Einwilligung ist jederzeit möglich. Für den Widerruf genügt eine
              formlose Mitteilung per E-Mail oder Sie melden sich über den
              "Austragen"-Link im Newsletter ab. Die Rechtmäßigkeit der bereits
              erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf
              unberührt.
            </p>
            <p>
              Zur Einrichtung des Abonnements eingegebene Daten werden im Falle
              der Abmeldung gelöscht. Sollten diese Daten für andere Zwecke und
              an anderer Stelle an uns übermittelt worden sein, verbleiben diese
              weiterhin bei uns.
            </p>
            <p>
              Der Versand der Newsletter erfolgt mittels des
              Versanddienstleisters MailChimp, einer Newsletterversandplattform
              des US-Anbieters Rocket Science Group, LLC, ansässig in 675 Ponce
              De Leon Ave NE #5000, Atlanta, GA 30308, USA. Die
              Datenschutzbestimmungen von MailChimp können Sie hier einsehen:{' '}
              <a href="https://mailchimp.com/legal/privacy/">
                https://mailchimp.com/legal/privacy/
              </a>. The Rocket Science Group LLC d/b/a MailChimp ist unter dem
              Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine
              Garantie, das europäisches Datenschutzniveau einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt0000000TO6hAAG&status=Active">
                https://www.privacyshield.gov
              </a>). MailChimp wird auf Grundlage unserer berechtigten
              Interessen gem. Art. 6 Abs. 1 lit. f DSGVO und eines
              Auftragsverarbeitungsvertrages gem. Art. 28 Abs. 3 S. 1 DSGVO
              eingesetzt.
            </p>
            <p>
              MailChimp kann die Daten der Empfänger in pseudonymer Form, d.h.
              ohne Zuordnung zu einem Nutzer, zur Optimierung oder Verbesserung
              der eigenen Services nutzen, z.B. zur technischen Optimierung des
              Versandes und der Darstellung der Newsletter oder für statistische
              Zwecke verwenden. MailChimp nutzt die Daten unserer
              Newsletterempfänger jedoch nicht, um diese selbst anzuschreiben
              oder um die Daten an Dritte weiterzugeben.
            </p>
            <p>
              <strong>YouTube</strong>
            </p>
            <p>
              Für Integration und Darstellung von Videoinhalten nutzt unsere
              Website Plugins von YouTube. Anbieter des Videoportals ist die
              YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA.
            </p>
            <p>
              Bei Aufruf einer Seite mit integriertem YouTube-Plugin wird eine
              Verbindung zu den Servern von YouTube hergestellt. YouTube erfährt
              hierdurch, welche unserer Seiten Sie aufgerufen haben.
            </p>
            <p>
              YouTube kann Ihr Surfverhalten direkt Ihrem persönlichen Profil
              zuzuordnen, sollten Sie in Ihrem YouTube Konto eingeloggt sein.
              Durch vorheriges Ausloggen haben Sie die Möglichkeit, dies zu
              unterbinden.
            </p>
            <p>
              Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden
              Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes
              Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
            </p>
            <p>
              Einzelheiten zum Umgang mit Nutzerdaten finden Sie in der
              Datenschutzerklärung von YouTube unter:
              <a href="https://www.google.de/intl/de/policies/privacy">
                https://www.google.de
              </a>.
            </p>
            <p>
              <strong>Cookies</strong>
            </p>
            <p>
              Unsere Website verwendet Cookies. Das sind kleine Textdateien, die
              Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns
              dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer
              zu machen.{' '}
            </p>
            <p>
              Einige Cookies sind “Session-Cookies.” Solche Cookies werden nach
              Ende Ihrer Browser-Sitzung von selbst gelöscht. Hingegen bleiben
              andere Cookies auf Ihrem Endgerät bestehen, bis Sie diese selbst
              löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer
              Website wiederzuerkennen.
            </p>
            <p>
              Mit einem modernen Webbrowser können Sie das Setzen von Cookies
              überwachen, einschränken oder unterbinden. Viele Webbrowser lassen
              sich so konfigurieren, dass Cookies mit dem Schließen des
              Programms von selbst gelöscht werden. Die Deaktivierung von
              Cookies kann eine eingeschränkte Funktionalität unserer Website
              zur Folge haben.
            </p>
            <p>
              Das Setzen von Cookies, die zur Ausübung elektronischer
              Kommunikationsvorgänge oder der Bereitstellung bestimmter, von
              Ihnen erwünschter Funktionen (z.B. Warenkorb) notwendig sind,
              erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Als
              Betreiber dieser Website haben wir ein berechtigtes Interesse an
              der Speicherung von Cookies zur technisch fehlerfreien und
              reibungslosen Bereitstellung unserer Dienste. Sofern die Setzung
              anderer Cookies (z.B. für Analyse-Funktionen) erfolgt, werden
              diese in dieser Datenschutzerklärung separat behandelt.
            </p>
            <p>
              <strong>Google Analytics</strong>
            </p>
            <p>
              Unsere Website verwendet Funktionen des Webanalysedienstes Google
              Analytics. Anbieter des Webanalysedienstes ist die Google Inc.,
              1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
            </p>
            <p>
              Google Analytics verwendet "Cookies." Das sind kleine Textdateien,
              die Ihr Webbrowser auf Ihrem Endgerät speichert und eine Analyse
              der Website-Benutzung ermöglichen. Mittels Cookie erzeugte
              Informationen über Ihre Benutzung unserer Website werden an einen
              Server von Google übermittelt und dort gespeichert.
              Server-Standort ist im Regelfall die USA.
            </p>
            <p>
              Das Setzen von Google-Analytics-Cookies erfolgt auf Grundlage von
              Art. 6 Abs. 1 lit. f DSGVO. Als Betreiber dieser Website haben wir
              &nbsp;ein berechtigtes Interesse an der Analyse des
              Nutzerverhaltens, um unser Webangebot und ggf. auch Werbung zu
              optimieren.
            </p>
            <p>IP-Anonymisierung</p>
            <p>
              Wir setzen Google Analytics in Verbindung mit der Funktion
              IP-Anonymisierung ein. Sie gewährleistet, dass Google Ihre
              IP-Adresse innerhalb von Mitgliedstaaten der Europäischen Union
              oder in anderen Vertragsstaaten des Abkommens über den
              Europäischen Wirtschaftsraum vor der Übermittlung in die USA
              kürzt. Es kann Ausnahmefälle geben, in denen Google die volle
              IP-Adresse an einen Server in den USA überträgt und dort kürzt. In
              unserem Auftrag wird Google diese Informationen benutzen, um Ihre
              Nutzung der Website auszuwerten, um Reports über
              Websiteaktivitäten zu erstellen und um weitere mit der
              Websitenutzung und der Internetnutzung verbundene Dienstleistungen
              gegenüber uns zu erbringen. Es findet keine Zusammenführung der
              von Google Analytics übermittelten IP-Adresse mit anderen Daten
              von Google statt.
            </p>
            <p>Browser Plugin</p>
            <p>
              Das Setzen von Cookies durch Ihren Webbrowser ist verhinderbar.
              Einige Funktionen unserer Website könnten dadurch jedoch
              eingeschränkt werden. Ebenso können Sie die Erfassung von Daten
              bezüglich Ihrer Website-Nutzung einschließlich Ihrer IP-Adresse
              mitsamt anschließender Verarbeitung durch Google unterbinden. Dies
              ist möglich, indem Sie das über folgenden Link erreichbare
              Browser-Plugin herunterladen und installieren:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout?hl=de">
                https://tools.google.com
              </a>.
            </p>
            <p>Widerspruch gegen die Datenerfassung</p>
            <p>
              Sie können die Erfassung Ihrer Daten durch Google Analytics
              verhindern, indem Sie auf folgenden Link klicken. Es wird ein
              Opt-Out-Cookie gesetzt, der die Erfassung Ihrer Daten bei
              zukünftigen Besuchen unserer Website verhindert: Google Analytics
              deaktivieren.
            </p>
            <p>
              Einzelheiten zum Umgang mit Nutzerdaten bei Google Analytics
              finden Sie in der Datenschutzerklärung von Google:{' '}
              <a href="https://support.google.com/analytics/answer/6004245?hl=de">
                https://support.google.com
              </a>.
            </p>
            <p>Auftragsverarbeitung</p>
            <p>
              Zur vollständigen Erfüllung der gesetzlichen Datenschutzvorgaben
              haben wir mit Google einen Vertrag über die Auftragsverarbeitung
              abgeschlossen.
            </p>
            <p>Demografische Merkmale bei Google Analytics</p>
            <p>
              Unsere Website verwendet die Funktion “demografische Merkmale” von
              Google Analytics. Mit ihr lassen sich Berichte erstellen, die
              Aussagen zu Alter, Geschlecht und Interessen der Seitenbesucher
              enthalten. Diese Daten stammen aus interessenbezogener Werbung von
              Google sowie aus Besucherdaten von Drittanbietern. Eine Zuordnung
              der Daten zu einer bestimmten Person ist nicht möglich. Sie können
              diese Funktion jederzeit deaktivieren. Dies ist über die
              Anzeigeneinstellungen in Ihrem Google-Konto möglich oder indem Sie
              die Erfassung Ihrer Daten durch Google Analytics, wie im Punkt
              “Widerspruch gegen die Datenerfassung” erläutert, generell
              untersagen.
            </p>
            <p>
              <strong>Twitter Plugin</strong>
            </p>
            <p>
              Unsere Website vewendet Funktionen des Dienstes Twitter. Anbieter
              ist die Twitter Inc., 1355 Market Street, Suite 900, San
              Francisco, CA 94103, USA.{' '}
            </p>
            <p>
              Bei Nutzung von Twitter und der Funktion "Re-Tweet" werden von
              Ihnen besuchte Websites mit Ihrem Twitter-Account verknüpft und in
              Ihrem Twitter-Feed veröffentlicht. Dabei erfolgt eine Übermittlung
              von Daten an Twitter. Über den Inhalt der übermittelten Daten
              sowie die Nutzung dieser Daten durch Twitter haben wir keine
              Kenntnis. Einzelheiten finden Sie in der Datenschutzerklärung von
              Twitter:{' '}
              <a href="https://twitter.com/privacy">
                https://twitter.com/privacy
              </a>.
            </p>
            <p>
              Sie können Ihre Datenschutzeinstellungen bei Twitter ändern:{' '}
              <a href="https://twitter.com/account/settings">
                https://twitter.com/account/settings
              </a>
            </p>
            <p>
              <strong>Facebook Plugin</strong>
            </p>
            <p>
              Unsere Website vewendet Funktionen des Dienstes Facebook. Anbieter
              ist die Facebook Inc., 1601 S. California Ave, Palo Alto, CA
              94304, USA.{' '}
            </p>
            <p>
              Bei Nutzung von Facebook und der Funktion "Gefällt mir", sowie
              "Teilen" werden von Ihnen besuchte Websites mit Ihrem
              Facebook-Account verknüpft und in Ihrem Facebook-Feed
              veröffentlicht. Dabei erfolgt eine Übermittlung von Daten an
              Facebook. Über den Inhalt der übermittelten Daten sowie die
              Nutzung dieser Daten durch Facebook haben wir keine Kenntnis.
              Einzelheiten finden Sie in der Datenschutzerklärung von Facebook:{' '}
              <a href="https://www.facebook.com/policy.php">
                https://www.facebook.com/policy.php
              </a>.
            </p>
            <p>
              <strong>Google AdWords und Google Conversion-Tracking</strong>
            </p>
            <p>
              Unsere Website verwendet Google AdWords. Anbieter ist die Google
              Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, United
              States.
            </p>
            <p>
              AdWords ist ein Online-Werbeprogramm. Im Rahmen des
              Online-Werbeprogramms arbeiten wir mit Conversion-Tracking. Nach
              einem Klick auf eine von Google geschaltete Anzeige wird ein
              Cookie für das Conversion-Tracking gesetzt. Cookies sind kleine
              Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert.
              Google AdWords Cookies verlieren nach 30 Tagen ihre Gültigkeit und
              dienen nicht der persönlichen Identifizierung der Nutzer. Am
              Cookie können Google und wir erkennen, dass Sie auf eine Anzeige
              geklickt haben und zu unserer Website weitergeleitet wurden.
            </p>
            <p>
              Jeder Google AdWords-Kunde erhält ein anderes Cookie. Die Cookies
              sind nicht über Websites von AdWords-Kunden nachverfolgbar. Mit
              Conversion-Cookies werden Conversion-Statistiken für
              AdWords-Kunden, die Conversion-Tracking einsetzen, erstellt.
              Adwords-Kunden erfahren wie viele Nutzer auf ihre Anzeige geklickt
              haben und auf Seiten mit Conversion-Tracking-Tag weitergeleitet
              wurden. AdWords-Kunden erhalten jedoch keine Informationen, die
              eine persönliche Identifikation der Nutzer ermöglichen. Wenn Sie
              nicht am Tracking teilnehmen möchten, können Sie einer Nutzung
              widersprechen. Hier ist das Conversion-Cookie in den
              Nutzereinstellungen des Browsers zu deaktivieren. So findet auch
              keine Aufnahme in die Conversion-Tracking Statistiken statt.
            </p>
            <p>
              Die Speicherung von “Conversion-Cookies” erfolgt auf Grundlage von
              Art. 6 Abs. 1 lit. f DSGVO. Wir als Websitebetreiber haben ein
              berechtigtes Interesse an der Analyse des Nutzerverhaltens, um
              unser Webangebot und unsere Werbung zu optimieren.
            </p>
            <p>
              Einzelheiten zu Google AdWords und Google Conversion-Tracking
              finden Sie in den Datenschutzbestimmungen von Google:{' '}
              <a href="https://www.google.de/policies/privacy/">
                https://www.google.de/policies/privacy/
              </a>.
            </p>
            <p>
              Mit einem modernen Webbrowser können Sie das Setzen von Cookies
              überwachen, einschränken oder unterbinden. Die Deaktivierung von
              Cookies kann eine eingeschränkte Funktionalität unserer Website
              zur Folge haben.
            </p>
          </div>
        </Card.Body>
        <Card.Footer
          content={Constants.COPYRIGHT}
          extra={<div>{Constants.WEBSITE}</div>}
        />
      </Card>
    );
  }
}
