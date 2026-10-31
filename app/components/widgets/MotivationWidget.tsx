import { useEffect, useState, memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Quote = { id: number; text: string; author: string };

const QUOTES: Quote[] = [
  { id: 1, text: "Talk doesn't cook rice.", author: "Chinese proverb" },
  { id: 2, text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { id: 3, text: "Think globally, act locally.", author: "Someone wise" },
  { id: 4, text: "Your only limit is your mind.", author: "Someone wise" },
  { id: 5, text: "Impossible is just an opinion.", author: "Paulo Coelho" },
  { id: 6, text: "So many books, so little time.", author: "Frank Zappa" },
  { id: 7, text: "Make each day your masterpiece.", author: "John Wooden" },
  { id: 8, text: "One today is worth two tomorrows.", author: "Benjamin Franklin" },
  { id: 9, text: "He is able who thinks he is able.", author: "Buddha" },
  { id: 10, text: "Do it with passion, or not at all.", author: "Rosa Nouchette Carey" },
  { id: 11, text: "If you can dream it, you can do it.", author: "Walt Disney" },
  { id: 12, text: "A beautiful thing is never perfect.", author: "Someone wise" },
  { id: 13, text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { id: 14, text: "What is life without a little risk?", author: "J.K. Rowling" },
  { id: 15, text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },
  { id: 16, text: "May you live every day of your life.", author: "Jonathan Swift" },
  { id: 17, text: "It's kind of fun to do the impossible.", author: "Walt Disney" },
  { id: 18, text: "Limit your 'always' and your 'nevers'.", author: "Amy Poehler" },
  { id: 19, text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { id: 20, text: "It is not enough to aim, you must hit.", author: "Italian Proverb" },
  { id: 21, text: "Everyone smiles in the same language.", author: "Someone wise" },
  { id: 22, text: "Nothing happens unless first we dream.", author: "Carl Sandburg" },
  { id: 23, text: "Whatever happens, take responsibility.", author: "Tony Robbins" },
  { id: 24, text: "You can observe a lot just by watching.", author: "Yogi Berra" },
  { id: 25, text: "All know the way; few actually walk it.", author: "Bodhidharma" },
  { id: 26, text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { id: 27, text: "Sometimes you win, sometimes you learn.", author: "John Maxwell" },
  { id: 28, text: "From small beginnings come great things.", author: "Someone wise" },
  { id: 29, text: "In order to win, you must expect to win.", author: "Richard Bach" },
  { id: 30, text: "Some pursue happiness, others create it.", author: "Someone wise" },
  { id: 31, text: "Freedom is the right to live as we wish.", author: "Epictetus" },
  { id: 32, text: "The trouble is, you think you have time.", author: "Buddha" },
  { id: 33, text: "You can do anything, but not all at once", author: "Someone wise" },
  { id: 34, text: "The simplest things are often the truest.", author: "Richard Bach" },
  { id: 35, text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { id: 36, text: "Never regret anything that made you smile.", author: "Mark Twain" },
  { id: 37, text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { id: 38, text: "It wasn’t raining when Noah built the ark.", author: "Howard Ruff" },
  { id: 39, text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { id: 40, text: "Don't just wait for inspiration. Become it.", author: "Someone wise" },
  { id: 41, text: "Every man dies. Not every man really lives.", author: "Someone wise" },
  { id: 42, text: "The harder you fall, the higher you bounce.", author: "Someone wise" },
  { id: 43, text: "It is better to travel well than to arrive.", author: "Buddha" },
  { id: 44, text: "If opportunity doesn’t knock, build a door.", author: "Kurt Cobain" },
  { id: 45, text: "What is coming is better than what is gone.", author: "Someone wise" },
  { id: 46, text: "It might not be easy but it’ll be worth it.", author: "Someone wise" },
  { id: 47, text: "There are no atheists in the falling plane.", author: "Mikhail Zadornov" },
  { id: 48, text: "Life begins at the end of your comfort zone.", author: "Neale Donald Walsch" },
  { id: 49, text: "Either you run the day, or the day runs you.", author: "Jim Rohn" },
  { id: 50, text: "Try to be a rainbow in someone else's cloud.", author: "Maya Angelou" },
  { id: 51, text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { id: 52, text: "Once we accept our limits, we go beyond them.", author: "Albert Einstein" },
  { id: 53, text: "If the wind will not serve, take to the oars.", author: "Latin Proverb" },
  { id: 54, text: "Live each day as if your life had just begun.", author: "Johann Wolfgang Von Goethe" },
  { id: 55, text: "The creative adult is the child who survived.", author: "Ursula Leguin" },
  { id: 56, text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
  { id: 57, text: "Do something wonderful, people may imitate it.", author: "Albert Schweitzer" },
  { id: 58, text: "I would rather die of passion than of boredom.", author: "Vincent van Gogh" },
  { id: 59, text: "Never memorize something that you can look up.", author: "Albert Einstein" },
  { id: 60, text: "The chief enemy of creativity is 'good' sense.", author: "Pablo Picasso" },
  { id: 61, text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { id: 62, text: "Do the right thing even when no one is looking.", author: "Someone wise" },
  { id: 63, text: "Begin to weave and God will give you the thread.", author: "German proverb" },
  { id: 64, text: "If you obey all the rules, you miss all the fun.", author: "Katharine Hepburn" },
  { id: 65, text: "Time is what we want most and what we use worst.", author: "William Penn" },
  { id: 66, text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { id: 67, text: "Everything has beauty, but not everyone can see.", author: "Confucius" },
  { id: 68, text: "Be kind whenever possible. It is always possible.", author: "Dalai Lama" },
  { id: 69, text: "Life is a learning experience, only if you learn.", author: "Yogi Berra" },
  { id: 70, text: "No masterpiece was ever created by a lazy artist.", author: "Someone wise" },
  { id: 71, text: "Life is change. Growth is optional. Choose wisely.", author: "Karen Clark" },
  { id: 72, text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { id: 73, text: "The first and greatest victory is to conquer self.", author: "Plato" },
  { id: 74, text: "All progress takes place outside the comfort zone.", author: "Michael John Bobak" },
  { id: 75, text: "Education costs money. But then so does ignorance.", author: "Sir Claus Moser" },
  { id: 76, text: "Creativity is the greatest rebellion in existence.", author: "Osho" },
  { id: 77, text: "Happiness is found in doing, not merely possessing.", author: "Napoleon Hill" },
  { id: 78, text: "Work hard, be kind, and amazing things will happen.", author: "Conan O’Brien" },
  { id: 79, text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { id: 80, text: "There is no way to happiness. Happiness is the way.", author: "Thich Nhat Hanh" },
  { id: 81, text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { id: 82, text: "The most wasted of all days is one without laughter.", author: "Nicolas Chamfort" },
  { id: 83, text: "Trust yourself. You know more than you think you do.", author: "Benjamin Spock" },
  { id: 84, text: "Every new day is another chance to change your life.", author: "Someone wise" },
  { id: 85, text: "Work hard in silence, let your success be the noise.", author: "Frank Ocean" },
  { id: 86, text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { id: 87, text: "Happy is the man who can make a living by his hobby.", author: "George Bernard Shaw" },
  { id: 88, text: "Your passion is waiting for your courage to catch up.", author: "Isabelle Lafleche" },
  { id: 89, text: "Life is about making an impact, not making an income.", author: "Kevin Kruse" },
  { id: 90, text: "Don’t live the same year 75 times and call it a life.", author: "Robin Sharma" },
  { id: 91, text: "Motivation comes from working on things we care about.", author: "Sheryl Sandberg" },
  { id: 92, text: "Never stop learning because life never stops teaching.", author: "Someone wise" },
  { id: 93, text: "Difficult roads always lead to beautiful destinations.", author: "Zig Ziglar" },
  { id: 94, text: "Be the same person privately, publicly, and personally.", author: "Judah Smith" },
  { id: 95, text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { id: 96, text: "Learn from yesterday, live for today, hope for tomorrow.", author: "Albert Einstein" },
  { id: 97, text: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { id: 98, text: "Never take life seriously. Nobody gets out alive anyway.", author: "Someone wise" },
  { id: 99, text: "When you do what you fear most, then you can do anything.", author: "Stephen Richards" },
  { id: 100, text: "I choose to make the rest of my life the best of my life.", author: "Louise Hay" },
  { id: 101, text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  { id: 102, text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { id: 103, text: "Fall in love with the process and the results will follow.", author: "Bradley Whitford" },
  { id: 104, text: "The world is changed by your example, not by your opinion.", author: "Paulo Coelho" },
  { id: 105, text: "It's not what you look at that matters, it's what you see.", author: "Someone wise" },
  { id: 106, text: "No eternal reward will forgive us now for wasting the dawn.", author: "Jim Morrisom" },
  { id: 107, text: "If you want to fly give up everything that weighs you down.", author: "Buddha" },
  { id: 108, text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { id: 109, text: "Do something today that your future self will thank you for.", author: "Someone wise" },
  { id: 110, text: "If you want to achieve greatness stop asking for permission.", author: "Someone wise" },
  { id: 111, text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
  { id: 112, text: "Learning is a treasure that will follow its owner everywhere.", author: "Chinese proverb" },
  { id: 113, text: "If you don't like where you are, change it. You're not a tree.", author: "Jim Rohn" },
  { id: 114, text: "The bad news is time flies. The good news is you're the pilot.", author: "Michael Altshuler" },
  { id: 115, text: "Society develops wit, but its contemplation alone forms genius.", author: "Madame de Stael" },
  { id: 116, text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { id: 117, text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { id: 118, text: "Genius is one percent inspiration and ninety-nine percent sweat.", author: "Thomas Edison" },
  { id: 119, text: "You don’t want to look back and know you could have done better.", author: "Someone wise" },
  { id: 120, text: "It's okay if they laugh at you. Much worse when you are mourned.", author: "Mikhail Zhvanetsky" },
  { id: 121, text: "It is better to fail in originality than to succeed in imitation.", author: "Herman Melville" },
  { id: 122, text: "Teach thy tongue to say 'I do not know' and thous shalt progress.", author: "Maimonides" },
  { id: 123, text: "You can’t use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
  { id: 124, text: "Learn the rules like a pro, so you can break them like an artist.", author: "Pablo Picasso" },
  { id: 125, text: "It’s not the load that breaks you down, it’s the way you carry it.", author: "Lou Holtz" },
  { id: 126, text: "If I cannot do great things, I can do small things in a great way.", author: "Martin Luther King Jr." },
  { id: 127, text: "A comfort zone is a beautiful place, but nothing ever grows there.", author: "Someone wise" },
  { id: 128, text: "There is no greater agony than bearing an untold story inside you.", author: "Maya Angelou" },
  { id: 129, text: "A ship in harbor is safe, but that is not what ships are built for.", author: "John A. Shedd" },
  { id: 130, text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
  { id: 131, text: "The best place to find a helping hand is at the end of your own arm.", author: "Swedish proverb" },
  { id: 132, text: "You don’t need to see the whole staircase, just take the first step.", author: "Martin Luther King Jr." },
  { id: 133, text: "If you’re the smartest person in the room, you’re in the wrong room.", author: "Someone wise" },
  { id: 134, text: "If you can't explain it simply, you don't understand it well enough.", author: "Albert Einstein" },
  { id: 135, text: "Try not to become a man of success, but rather become a man of value.", author: "Albert Einstein" },
  { id: 136, text: "Build your own dreams, or someone else will hire you to build theirs.", author: "Farrah Gray" },
  { id: 137, text: "Some people never go crazy. What truly horrible lives they must lead.", author: "Charles Bukowski" },
  { id: 138, text: "Some people look for a beautiful place. Others make a place beautiful.", author: "Hazrat Inayat Khan" },
  { id: 139, text: "It takes nothing to join the crowd. It takes everything to stand alone.", author: "Hans F. Hansen" },
  { id: 140, text: "Of all the words of mice and men, the saddest are 'It might have been'.", author: "Kurt Vonnegut" },
  { id: 141, text: "If we have the attitude that it’s going to be a great day it usually is.", author: "Catherine Pulsifier" },
  { id: 142, text: "You will never always be motivated, so you must learn to be disciplined.", author: "Someone wise" },
  { id: 143, text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
  { id: 144, text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { id: 145, text: "Only put off until tomorrow what you are willing to die having left undone.", author: "Pablo Picasso" },
  { id: 146, text: "Write your dreams in pen. Write your plans in pencil.", author: "Dan Go" },
];

interface MotivationWidgetProps {
  interval?: number; // milliseconds
}

const MotivationWidget = memo(function MotivationWidget({
  interval = 60 * 60 * 1000, // default to 60 minutes
}: MotivationWidgetProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (QUOTES.length <= 1 || interval <= 0) return;

    const timer = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % QUOTES.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval]);

  const current = QUOTES[index] ?? QUOTES[0];

  const enterFrom = reduceMotion
  ? { opacity: 0 }
  : { opacity: 0, y: 12, filter: "blur(6px)" };

const enterTo = { opacity: 1, y: 0, filter: "blur(0px)" };

const exitTo = reduceMotion
  ? { opacity: 0 }
  : { opacity: 0, y: -10, filter: "blur(4px)" }

  if (!current) return null;

  return (
    <div className="glass rounded-2xl px-[31px] py-[13px] pb-[17px] text-center flex flex-col items-center justify-center overflow-hidden">

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          initial={enterFrom}
          animate={enterTo}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: -10,
                  filter: "blur(4px)",
                }
          }
          transition={
            reduceMotion
              ? { duration: 0.1 }
              : {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="flex flex-col items-center"
        >
          <p className="font-manrope text-[28px] font-medium leading-[36px]">
            {current.text}
          </p>

          <span className="mt-2 text-sm text-text/75 font-medium">
            {current.author}
          </span>
        </motion.div>
      </AnimatePresence>

    </div>
  );
});

export default MotivationWidget;