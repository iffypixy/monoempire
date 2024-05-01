import "./index.css";

export const DiceRoller: React.FC = () => (
    <div>
        <div id="dice1" className="dice dice-one">
            <div id="dice-one-side-one" className="side one">
                <div className="dot one-1"></div>
            </div>

            <div id="dice-one-side-two" className="side two">
                <div className="dot two-1"></div>
                <div className="dot two-2"></div>
            </div>

            <div id="dice-one-side-three" className="side three">
                <div className="dot three-1"></div>
                <div className="dot three-2"></div>
                <div className="dot three-3"></div>
            </div>

            <div id="dice-one-side-four" className="side four">
                <div className="dot four-1"></div>
                <div className="dot four-2"></div>
                <div className="dot four-3"></div>
                <div className="dot four-4"></div>
            </div>

            <div id="dice-one-side-five" className="side five">
                <div className="dot five-1"></div>
                <div className="dot five-2"></div>
                <div className="dot five-3"></div>
                <div className="dot five-4"></div>
                <div className="dot five-5"></div>
            </div>

            <div id="dice-one-side-six" className="side six">
                <div className="dot six-1"></div>
                <div className="dot six-2"></div>
                <div className="dot six-3"></div>
                <div className="dot six-4"></div>
                <div className="dot six-5"></div>
                <div className="dot six-6"></div>
            </div>
        </div>

        <div id="dice2" className="dice dice-two">
            <div id="dice-two-side-one" className="side one">
                <div className="dot one-1"></div>
            </div>

            <div id="dice-two-side-two" className="side two">
                <div className="dot two-1"></div>
                <div className="dot two-2"></div>
            </div>

            <div id="dice-two-side-three" className="side three">
                <div className="dot three-1"></div>
                <div className="dot three-2"></div>
                <div className="dot three-3"></div>
            </div>

            <div id="dice-two-side-four" className="side four">
                <div className="dot four-1"></div>
                <div className="dot four-2"></div>
                <div className="dot four-3"></div>
                <div className="dot four-4"></div>
            </div>

            <div id="dice-two-side-five" className="side five">
                <div className="dot five-1"></div>
                <div className="dot five-2"></div>
                <div className="dot five-3"></div>
                <div className="dot five-4"></div>
                <div className="dot five-5"></div>
            </div>

            <div id="dice-two-side-six" className="side six">
                <div className="dot six-1"></div>
                <div className="dot six-2"></div>
                <div className="dot six-3"></div>
                <div className="dot six-4"></div>
                <div className="dot six-5"></div>
                <div className="dot six-6"></div>
            </div>
        </div>
    </div>
);

export const useDiceRoller = () => {
    return {
        rollDice: () => {
            const elements = {
                dice1: document.getElementById("dice1")!,
                dice2: document.getElementById("dice2")!,
            };

            const results = {
                dice1: Math.floor(Math.random() * 6 + 1),
                dice2: Math.floor(Math.random() * 6 + 1),
            };

            for (let i = 1; i <= 6; i++) {
                elements.dice1.classList.remove("show-" + i);
                elements.dice2.classList.remove("show-" + i);

                if (results.dice1 === i) {
                    elements.dice1.classList.add("show-" + i);
                }

                if (results.dice2 === i) {
                    elements.dice2.classList.add("show-" + i);
                }
            }
        },
    };
};
