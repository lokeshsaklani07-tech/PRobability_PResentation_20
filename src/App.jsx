import React, { useState, useEffect, useRef } from 'react';
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation';

// Definition of the SVG Arrow Marker globally for hand-drawn lines
const ArrowDef = () => (
  <svg width="0" height="0">
    <defs>
      <marker id="drawn-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--gold-light)" />
      </marker>
    </defs>
  </svg>
);

// Custom Hand Note Component with an animated curved arrow
const HandNote = ({ text, top, left, right, bottom, arrowSrc, arrowW, arrowH, arrowStyle }) => (
  <div className="hand-note" style={{ top, left, right, bottom }}>
    <div style={{position: 'relative'}}>{text}</div>
    {arrowSrc && (
      <svg width={arrowW} height={arrowH} style={{position: 'absolute', ...arrowStyle}} viewBox={`0 0 ${arrowW} ${arrowH}`}>
        <path className="hand-arrow" d={arrowSrc} markerEnd="url(#drawn-arrow)" />
      </svg>
    )}
  </div>
);

const SlideWrapper = ({ id, activeSlide, children }) => {
  return (
    <div id={`slide-${id}`} className={`slide ${activeSlide === id ? 'is-visible' : ''}`}>
      <div className="layout-frame">
        {/* We use RoughNotationGroup to choreograph the drawing animations */}
        <RoughNotationGroup show={activeSlide === id}>
          {children}
        </RoughNotationGroup>
      </div>
    </div>
  );
};

export default function App() {
  const bgImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg'];
  const [bgIndex, setBgIndex] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0); // 0 or 1
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);

  // Update background every 2 slides
  useEffect(() => {
    const newBgIndex = Math.floor(activeSlide / 2) % bgImages.length;
    if (newBgIndex !== bgIndex) {
      const nextLayer = 1 - activeLayer;
      const nextBg = bgImages[newBgIndex];
      
      const layers = [bg1Ref.current, bg2Ref.current];
      if (layers[nextLayer]) {
        layers[nextLayer].style.backgroundImage = `url(${nextBg})`;
        layers[nextLayer].style.opacity = 1;
        layers[activeLayer].style.opacity = 0;
      }
      
      setBgIndex(newBgIndex);
      setActiveLayer(nextLayer);
    }
  }, [activeSlide, bgIndex, activeLayer]);

  const scrollToSlide = (i) => {
    document.getElementById(`slide-${i}`)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSlide(i);
  };

  return (
    <>
      <div className="background-layers">
        <div ref={bg1Ref} className="bg-layer" style={{backgroundImage: `url(${bgImages[0]})`, opacity: 1}}></div>
        <div ref={bg2Ref} className="bg-layer" style={{backgroundImage: `url(${bgImages[0]})`, opacity: 0}}></div>
      </div>
      <ArrowDef />
      <div className="nav-dots">
        {[...Array(TOTAL_SLIDES)].map((_, i) => (
          <div key={i} className={`dot ${activeSlide === i ? 'active' : ''}`} onClick={() => scrollToSlide(i)} />
        ))}
      </div>

      <div className="presentation-container">
        
        {/* Slide 0: Luxury Title */}
        <SlideWrapper id={0} activeSlide={activeSlide}>
          <div className="grid-2 align-center">
            <div>
              <h3>BBA Artificial Intelligence & Data Science</h3>
              <h1>The Statistics<br/>Of Uncertainty</h1>
              <p style={{fontSize: '1.6rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--gold-primary)'}}>
                A Primer on Probability & Predictive Modeling.
              </p>
            </div>
            <div style={{borderLeft: '1px solid var(--border-subtle)', paddingLeft: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
               <p style={{textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1rem', color: 'var(--text-muted)'}}>Prepared By</p>
               <h2 style={{margin: '0.5rem 0', fontSize: '2.5rem'}}>Lokesh Saklani</h2>
               <p style={{fontFamily: 'monospace', color: 'var(--gold-light)'}}>Role No. 56</p>
            </div>
          </div>
        </SlideWrapper>

        {/* Slide 1: Absolute Basics with Hand Note */}
        <SlideWrapper id={1} activeSlide={activeSlide}>
          <div className="grid-2 align-center">
            <div style={{position: 'relative'}}>
              <h3>Fundamental Theory</h3>
              <h2>Defining Probability</h2>
              <p>In Data Science, probability is simply a mathematical 
                <RoughNotation type="highlight" color="#C5B35830" iterations={1} strokeWidth={2}> framework </RoughNotation> 
                to quantify our uncertainty about the world. It exists on a strict spectrum from 0 to 1.</p>
              
              <div className="formula-box">
                P(Event) = <RoughNotation type="underline" color="var(--gold-primary)">Outcome</RoughNotation>
              </div>

               <HandNote 
                  text="This 'P' is just a function. You feed it a question, it returns a %" 
                  top="60%" left="60%" 
                  arrowSrc="M 0 0 Q -30 40 -120 40" 
                  arrowW="150" arrowH="80" 
                  arrowStyle={{top: '-30px', left: '-140px'}}
                />
            </div>
            <div className="meme-container">
               {/* Sleek corporate meme integration */}
               <img src="https://i.imgflip.com/261o3j.jpg" alt="Brain Meme Strategy" className="meme-bg" />
               <div className="meme-text" style={{top: '10%', right: '10%', width: '40%', fontSize: '1.2rem'}}>P(Coin Toss)</div>
               <div className="meme-text" style={{top: '35%', right: '10%', width: '40%', fontSize: '1.2rem'}}>P(A ∪ B) = P(A) + P(B)</div>
               <div className="meme-text" style={{top: '60%', right: '10%', width: '40%', fontSize: '1.2rem'}}>Bayesian Inference Modeling</div>
               <div className="meme-text" style={{top: '85%', right: '10%', width: '40%', fontSize: '1rem'}}>Predicting SaaS Churn via Random Forests</div>
            </div>
          </div>
        </SlideWrapper>

        {/* Slide 2: Symbols Translation */}
        <SlideWrapper id={2} activeSlide={activeSlide}>
          <div style={{position: 'relative'}}>
            <h3>Syntax Translation</h3>
            <h2>Deciphering the Math</h2>
            <p style={{maxWidth: '800px'}}>Before applying machine learning logic, we must translate mathematical set notation into plain procedural English.</p>
            
            <div className="grid-2 mt-4" style={{marginTop: '4rem'}}>
              <div className="card-item">
                <h2 style={{fontSize: '4rem', color: 'var(--gold-primary)', marginBottom: '0'}}>∪</h2>
                <h3 style={{fontSize: '1.8rem', color: 'var(--text-main)', marginTop:'1rem'}}>Union (OR Logic)</h3>
                <p>An inclusive bucket. Event A happens, <strong>or</strong> Event B happens, <strong>or both</strong>.<br/><br/><i>Example: I will invest in Apple <b>∪</b> Microsoft.</i></p>
                <HandNote 
                    text="Just like the word OR!" 
                    top="-20%" left="50%" 
                    arrowSrc="M 30 50 Q 0 40 -20 10" 
                    arrowW="60" arrowH="60" 
                    arrowStyle={{top: '100%', left: '-30px'}}
                  />
              </div>
              <div className="card-item">
                <h2 style={{fontSize: '4rem', color: 'var(--gold-primary)', marginBottom: '0'}}>∩</h2>
                <h3 style={{fontSize: '1.8rem', color: 'var(--text-main)', marginTop:'1rem'}}>Intersection (AND Logic)</h3>
                <p>The overlap. Event A <strong>and</strong> Event B must co-occur simultaneously.<br/><br/><i>Example: I will invest in a company that is Profitable <b>∩</b> Sustainable.</i></p>
              </div>
            </div>
          </div>
        </SlideWrapper>

        {/* Slide 3: Essential Terminology */}
        <SlideWrapper id={3} activeSlide={activeSlide}>
           <h3>The Dictionary</h3>
           <h2 style={{maxWidth: '800px'}}>The Three Pillars of Statistical Measurement</h2>
           
           <div className="grid-3 mt-4">
              <div style={{paddingRight: '2rem'}}>
                 <h2 style={{color: 'var(--gold-primary)'}}>01.</h2>
                 <h3 style={{color: 'white'}}>The Experiment</h3>
                 <p>The actual physical or simulated process that generates quantifiable outcomes.</p>
                 <p style={{fontStyle: 'italic', opacity: 0.8}}>Ex: Launching an A/B test for an AI product.</p>
              </div>
              <div style={{borderLeft: '1px solid var(--border-subtle)', paddingLeft: '2rem', paddingRight: '2rem'}}>
                 <h2 style={{color: 'var(--gold-primary)'}}>02.</h2>
                 <h3 style={{color: 'white'}}>Sample Space (S)</h3>
                 <p>The exhaustive menu containing exactly <RoughNotation type="circle" color="var(--gold-primary)">every single possible</RoughNotation> outcome.</p>
                 <p style={{fontStyle: 'italic', opacity: 0.8}}>Ex: S = {`{Visitor Buys, Visitor Leaves}`}</p>
                 <HandNote text="It's just the entire menu" bottom="-40px" right="0" />
              </div>
              <div style={{borderLeft: '1px solid var(--border-subtle)', paddingLeft: '2rem'}}>
                 <h2 style={{color: 'var(--gold-primary)'}}>03.</h2>
                 <h3 style={{color: 'white'}}>The Event (E)</h3>
                 <p>Any specific subset of the sample space that we are attempting to measure the likelihood of.</p>
                 <p style={{fontStyle: 'italic', opacity: 0.8}}>Ex: E = {`{Visitor Buys}`}</p>
              </div>
           </div>
        </SlideWrapper>

        {/* Slide 4: Confusing Concepts (Mutually Exclusive vs Independent) */}
        <SlideWrapper id={4} activeSlide={activeSlide}>
          <div className="grid-2 align-center">
            <div style={{position: 'relative'}}>
              <h3>Core Logic</h3>
              <h2>Differentiating Confusing Concepts</h2>
              
              <div style={{marginBottom: '3rem'}}>
                 <h3 style={{color: 'white'}}>Mutually Exclusive Events</h3>
                 <p>Events that physically block each other. It is an absolute impossibility for them to co-exist.<br/>
                 <strong style={{color: 'var(--gold-primary)'}}>Analogy:</strong> Like trying to be "Asleep" and "Awake" at the exact same millisecond. Oil and water.</p>
                 <HandNote 
                    text="Zero overlap" 
                    top="60%" right="-50px" 
                    arrowSrc="M 50 10 Q 20 40 0 60" 
                    arrowW="60" arrowH="80" 
                    arrowStyle={{top: '10px', left: '-50px'}}
                 />
              </div>

              <div>
                 <h3 style={{color: 'white'}}>Independent Events</h3>
                 <p>Events that have absolutely zero influence on one another. Knowing one happened provides no mathematical edge in predicting the other.<br/>
                 <strong style={{color: 'var(--gold-primary)'}}>Analogy:</strong> If a trader in Tokyo buys stock, and you flip a coin in London. Total strangers.</p>
              </div>
            </div>
            
            <div className="meme-container">
               <img src="https://i.imgflip.com/1ur9b0.jpg" alt="Distracted Boyfriend" className="meme-bg" style={{objectPosition: '50% 20%'}}/>
               <div className="meme-text" style={{top: '50%', left: '10%'}}>Data Scientists</div>
               <div className="meme-text" style={{top: '50%', right: '10%'}}>SaaS AI Metrics</div>
               <div className="meme-text" style={{top: '75%', left: '35%'}}>Bayesian Predictions</div>
            </div>
          </div>
        </SlideWrapper>

        {/* Slide 5: Empirical Probability */}
        <SlideWrapper id={5} activeSlide={activeSlide}>
          <h3>Measurement Paradigms</h3>
          <h2>Empirical Probability</h2>
          <p style={{maxWidth: '800px'}}>The backbone of all Data Science. We do not rely on theoretical perfection; we rely on <strong>Historical Data Frequency</strong> to forecast the future.</p>
          
          <div className="formula-box" style={{position: 'relative'}}>
            P(E) = <span style={{color: 'var(--gold-primary)'}}>Past Triggers</span> / Total Past Attempts
            <HandNote 
                    text="Wait, isn't this just Machine Learning?" 
                    top="-30px" right="0" 
                    arrowSrc="M 50 40 Q 20 20 -20 0" 
                    arrowW="80" arrowH="50" 
                    arrowStyle={{top: '30px', left: '-50px'}}
                 />
          </div>
          <p><strong>Business Application:</strong> If your web server logged 10,000 visitors last month and 250 resulted in a premium conversion, the empirical probability (prior belief) for the next generic visitor converting is 2.5%.</p>
        </SlideWrapper>

        {/* Slide 6: The Rules - Addition */}
        <SlideWrapper id={6} activeSlide={activeSlide}>
          <h3>Axioms of Probability</h3>
          <h2>The Addition Rule (Unions)</h2>
          <p>Triggered by the logical operator <RoughNotation type="highlight" color="#C5B35830">"OR"</RoughNotation>. Used to calculate the chance that at least one of multiple events occurs.</p>

          <div className="grid-2 mt-4">
             <div className="card-item">
                <h3 style={{color: 'white'}}>Mutually Exclusive Scenario</h3>
                <p>If they cannot happen together, just sum them.</p>
                <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--gold-primary)', marginTop: '2rem'}}>P(A ∪ B) = P(A) + P(B)</p>
             </div>
             <div className="card-item" style={{position: 'relative'}}>
                <h3 style={{color: 'white'}}>Standard Scenario</h3>
                <p>If they CAN overlap, you must subtract the intersection to prevent double-counting.</p>
                <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--gold-primary)', marginTop: '2rem'}}>
                  P(A ∪ B) = P(A) + P(B) - <RoughNotation type="crossed-off" color="red" strokeWidth={3}>P(A ∩ B)</RoughNotation>
                </p>
                <HandNote text="Subtract the overlap!" bottom="10%" right="10%" />
             </div>
          </div>
        </SlideWrapper>

        {/* Slide 7: The Rules - Multiplication */}
        <SlideWrapper id={7} activeSlide={activeSlide}>
          <h3>Axioms of Probability</h3>
          <h2>The Multiplication Rule (Intersections)</h2>
          <p>Triggered by the logical operator <RoughNotation type="highlight" color="#C5B35830">"AND"</RoughNotation>. Calculates the likelihood of events chaining together sequentially.</p>

          <div className="grid-2 mt-4">
             <div className="card-item">
                <h3 style={{color: 'white'}}>Independent Scenario</h3>
                <p>When outcome A doesn't affect B. Simply multiply the flat odds.</p>
                <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--gold-primary)', marginTop: '2rem'}}>P(A ∩ B) = P(A) × P(B)</p>
             </div>
             <div className="card-item" style={{position: 'relative'}}>
                <h3 style={{color: 'white'}}>Dependent Scenario</h3>
                <p>When A happens, it fundamentally alters the math for B. We must use conditional logic.</p>
                <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--gold-primary)', marginTop: '2rem'}}>
                  P(A ∩ B) = P(A) × <RoughNotation type="box" color="var(--gold-primary)">P(B|A)</RoughNotation>
                </p>
                <HandNote text="B given that A already occurred" bottom="5%" right="-80px" />
             </div>
          </div>
        </SlideWrapper>

        {/* Slide 8: Bayes */}
        <SlideWrapper id={8} activeSlide={activeSlide}>
          <div style={{position: 'relative'}}>
            <h3>Advanced Statistics</h3>
            <h2>The Bayesian Update <span style={{fontFamily: 'var(--font-sans)', color: 'var(--text-muted)'}}>| The Engine of AI</span></h2>
            <p style={{maxWidth: '800px', marginBottom: '2rem'}}>
              Thomas Bayes proved we shouldn't just guess odds statically. We should start with a prior belief, and when <RoughNotation type="underline" color="var(--gold-primary)">new evidence</RoughNotation> arrives, mathematically update our accuracy.
            </p>
            
            <div className="formula-box" style={{fontSize: '3.5rem', marginTop: '1rem'}}>
               P(A|B) = <span style={{fontSize: '2rem'}}>[ P(B|A) × P(A) ] / P(B)</span>
            </div>

            <HandNote text="Posterior (Updated Belief)" top="55%" left="5%" arrowSrc="M 0 0 Q 30 -30 60 -5" arrowW="70" arrowH="40" arrowStyle={{top:'-20px', right:'-70px'}} />
            <HandNote text="Likelihood of Evidence" bottom="15%" left="40%" />
            <HandNote text="Prior Belief" top="30%" right="20%" />
          </div>
        </SlideWrapper>

        {/* Slide 9: Case Study */}
        <SlideWrapper id={9} activeSlide={activeSlide}>
          <h3>Real World Application</h3>
          <h2>Predicting User Churn (SaaS)</h2>
          <div className="grid-2 mt-4">
             <div>
                <p><strong>The Corporate Problem:</strong> We are a SaaS business. Historically, 10% of users cancel their subscriptions (Churn). We want our AI to predict <em>who</em> will cancel before they actually do.</p>
                <p><strong>The Evidence Found:</strong> We analyzed support tickets.</p>
                <ul>
                  <li>60% of people who churned had filed a complaint.</li>
                  <li>Only 20% of happy, retained users filed complaints.</li>
                </ul>
             </div>
             <div className="card-item" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h3 style={{color: 'white'}}>Converting to Mathematical Notation</h3>
                <p style={{fontFamily: 'monospace', color: 'var(--gold-primary)', margin:'0.5rem 0'}}>P(Churn) = 0.10</p>
                <p style={{fontFamily: 'monospace', color: 'white', margin:'0.5rem 0'}}>P(Ticket | Churn) = 0.60</p>
                <p style={{fontFamily: 'monospace', color: 'white', margin:'0.5rem 0'}}>P(Ticket | Retained) = 0.20</p>
             </div>
          </div>
        </SlideWrapper>

        {/* Slide 10: Case Study Solved */}
        <SlideWrapper id={10} activeSlide={activeSlide}>
           <h3>The Bayesian Application</h3>
           <h2>Live Calculation Updating</h2>
           <p style={{position: 'relative'}}>
             A user just submitted a ticket. What is their new 
             <RoughNotation type="circle" color="var(--gold-primary)" strokeWidth={2}> Churn Risk? </RoughNotation>
             <HandNote text="We must find P(Churn | Ticket)" top="-40px" right="20%" />
           </p>

           <div className="card-item mt-4">
             <h3 style={{color: 'var(--gold-light)'}}>Step 1: Total Margin of Evidence P(Ticket)</h3>
             <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.4rem'}}>
               (0.60 × 0.10) + (0.20 × 0.90) = <strong style={{color: 'white'}}>0.24</strong>
             </p>
           </div>

           <div className="card-item" style={{marginTop: '2rem'}}>
             <h3 style={{color: 'var(--gold-primary)'}}>Step 2: The Final Posterior</h3>
             <p style={{fontFamily: 'var(--font-serif)', fontSize: '1.4rem'}}>
               (0.60 × 0.10) / 0.24 = <strong style={{color: 'white', fontSize: '2rem'}}>0.25</strong>
             </p>
           </div>
           
           <p style={{marginTop: '2rem', fontStyle: 'italic', fontWeight: '500'}}>
             <strong>Actionable Intelligence:</strong> The mere act of submitting a ticket mathematically elevated their risk from 10% to 25%. The AI system instantly flags the account for retention triage.
           </p>
        </SlideWrapper>

        {/* Slide 11: Conclusion */}
        <SlideWrapper id={11} activeSlide={activeSlide}>
          <div className="grid-2 align-center">
            <div>
              <p style={{fontSize: '2rem', fontFamily: 'var(--font-serif)', lineHeight: 1.4}}>
                "Probability is the quantification of doubt, transforming chaotic intuition into actionable corporate strategy."
              </p>
              <div style={{width: '60px', height: '2px', background: 'var(--gold-primary)', margin: '2rem 0'}} />
              <p>It forms the mathematical bedrock of all modern Artificial Intelligence, Risk Analysis, and Predictive Commerce.</p>
            </div>
            
            <div style={{padding: '0 4rem'}}>
              <h2 style={{fontSize:'2rem', marginBottom: '0.5rem'}}>Prepared By</h2>
              <h1 style={{fontSize:'4rem', marginBottom: '0.5rem'}}>Lokesh Saklani</h1>
              <p style={{fontFamily: 'monospace', color: 'var(--gold-light)', fontSize: '1.2rem'}}>BBA Artificial Intelligence & Data Science | Roll: 56</p>
              <br/>
              <p style={{textTransform:'uppercase', fontSize:'0.9rem', letterSpacing:'0.2em', opacity: 0.5}}>© Business Statistics Faculty Presentation</p>
            </div>
          </div>
        </SlideWrapper>

      </div>
    </>
  );
}
