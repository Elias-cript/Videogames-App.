import React from "react";
import styles from './About.module.css'
import Nav from './Nav'

export default function About() {

    return (
        <div className={styles.container}>
            <Nav />
            <div className={styles.container2}>
                <br />
                <h1 className={styles.h1}>Hola 👋 mi nombre es Elias</h1>
                <br />
                <div className={styles.divp}>
                    <p className={styles.p}>
                        Soy un desarrollador Full Stack con practicas en Front end, Back end y Databases.
                        Estoy muy interesado en seguir aprendiendo del mundo de la tecnologia y en trabajar
                        en este rubro :)
                        <br />
                        <br />
                        Tengo gran destreza para la solucion de problemas, el trabajo en equipo y adaptarme
                        a distintos ambientes! Ademas, llevo mucho tiempo interesado en el arte! lo que me convierte
                        en una persona altamente creativa.
                        <br />
                        <br />
                        Espero que disfruten de mi primer proyecto y realmente espero poder llevar muchos mas a cabo
                        ya que me diverti mucho (y tambien estrese) pero suelo manejarme bien con ello :) fue una gran
                        experiencia y espero con ansias tener muchas mas..
                        <br />
                        <br />
                        <h4 className={styles.saludo}>Gracias por leer 🙏 un abrazo: Elias.</h4>

                    </p>
                </div>
            </div>
        </div>
    )
}