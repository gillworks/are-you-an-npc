-- TRE-11: Seed additional 20 NPC quiz questions (IDs 11-30) and their answers.

insert into public.questions (landing_page_id, question_order, scenario)
values
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 11, $$You get a last-minute invite to a party you weren't planning on attending. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 12, $$You find a $20 bill on the sidewalk. No one's around. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 13, $$A coworker asks you to review their presentation before a big meeting. It needs a lot of work. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 14, $$Someone casually cuts in front of you in a long grocery store line. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 15, $$Your favorite show just dropped its final season. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 16, $$The DJ at a wedding plays your absolute favorite song. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 17, $$You get a voicemail from an unknown number. It's just silence, then a hang-up. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 18, $$Someone asks where you want to go for dinner. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 19, $$You have 30 free minutes before a meeting. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 20, $$The restaurant gets your order wrong. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 21, $$You spot someone you vaguely know at the grocery store. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 22, $$Your friends want to do karaoke. You're sober. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 23, $$Someone asks for your 'hot take' on something. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 24, $$You're running late and your GPS freezes mid-route. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 25, $$You notice a stranger sitting alone, visibly upset, in a public place. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 26, $$You wake up from a vivid, deeply weird dream. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 27, $$A friend shares an article that directly contradicts something you believe. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 28, $$You're at an airport and your flight's delayed by two hours. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 29, $$You overhear a fascinating conversation between strangers next to you at a café. You:$$),
  ((select id from public.landing_pages where slug = 'are-you-an-npc'), 30, $$Someone compliments something you made — a project, a meal, a playlist. You:$$)
on conflict (landing_page_id, question_order)
do update set
  scenario = excluded.scenario,
  updated_at = timezone('utc'::text, now());

with question_ids as (
  select q.id, q.question_order
  from public.questions q
  inner join public.landing_pages lp on lp.id = q.landing_page_id
  where lp.slug = 'are-you-an-npc'
)
insert into public.answers (question_id, answer_order, answer_text, score)
values
  ((select id from question_ids where question_order = 11), 1, $$Say yes immediately and start mentally planning my outfit and opening line.$$ , 7),
  ((select id from question_ids where question_order = 11), 2, $$Say yes if I like the person — I'm usually glad I went.$$ , 28),
  ((select id from question_ids where question_order = 11), 3, $$Need at least 20 minutes to decide. End up going. Fine.$$ , 52),
  ((select id from question_ids where question_order = 11), 4, $$Decline and feel a small wave of relief wash over me.$$ , 74),
  ((select id from question_ids where question_order = 11), 5, $$Don't see the message until the next morning.$$ , 94),

  ((select id from question_ids where question_order = 12), 1, $$Pocket it and immediately decide this is a sign to do something impulsive.$$ , 5),
  ((select id from question_ids where question_order = 12), 2, $$Pocket it, feel a little lucky, use it for something fun.$$ , 25),
  ((select id from question_ids where question_order = 12), 3, $$Pocket it, feel vaguely guilty, buy a coffee.$$ , 55),
  ((select id from question_ids where question_order = 12), 4, $$Look around hoping someone will claim it so I don't have to decide.$$ , 75),
  ((select id from question_ids where question_order = 12), 5, $$Walk past it. Not worth the complication.$$ , 92),

  ((select id from question_ids where question_order = 13), 1, $$Rewrite the whole thing with them — we're making this good.$$ , 8),
  ((select id from question_ids where question_order = 13), 2, $$Give honest, specific feedback they can actually use.$$ , 30),
  ((select id from question_ids where question_order = 13), 3, $$Mention the bigger issues and wish them luck with the rest.$$ , 55),
  ((select id from question_ids where question_order = 13), 4, $$Say it looks great, with one small tweak to seem helpful.$$ , 78),
  ((select id from question_ids where question_order = 13), 5, $$Tell them it's fine. It's their problem, not yours.$$ , 94),

  ((select id from question_ids where question_order = 14), 1, $$Calmly but very directly point out what they just did. No scene, but clear.$$ , 10),
  ((select id from question_ids where question_order = 14), 2, $$Clear my throat loudly and make pointed eye contact.$$ , 30),
  ((select id from question_ids where question_order = 14), 3, $$Silently seethe for the next three minutes, do nothing.$$ , 58),
  ((select id from question_ids where question_order = 14), 4, $$Stare at the back of their head and craft a devastating comment I'll never say.$$ , 76),
  ((select id from question_ids where question_order = 14), 5, $$Shrug. Doesn't really matter.$$ , 93),

  ((select id from question_ids where question_order = 15), 1, $$Block out the weekend, make an event of it, text the group chat in real-time.$$ , 9),
  ((select id from question_ids where question_order = 15), 2, $$Watch it at a pace I can actually enjoy — no rushing.$$ , 28),
  ((select id from question_ids where question_order = 15), 3, $$Watch it over a few weeks between other things.$$ , 54),
  ((select id from question_ids where question_order = 15), 4, $$Start it, get distracted, still haven't finished three months later.$$ , 76),
  ((select id from question_ids where question_order = 15), 5, $$It's on my list. Has been for a while.$$ , 93),

  ((select id from question_ids where question_order = 16), 1, $$I'm already on the dance floor before the first bar ends.$$ , 5),
  ((select id from question_ids where question_order = 16), 2, $$Make a beeline for the floor and pull someone with me.$$ , 22),
  ((select id from question_ids where question_order = 16), 3, $$Nod along at my table. Internally, I'm thriving.$$ , 50),
  ((select id from question_ids where question_order = 16), 4, $$Smile and keep my conversation going, maybe tap my foot.$$ , 72),
  ((select id from question_ids where question_order = 16), 5, $$Register it faintly in the background. Good song.$$ , 90),

  ((select id from question_ids where question_order = 17), 1, $$Call it back immediately. I need to know.$$ , 6),
  ((select id from question_ids where question_order = 17), 2, $$Google the number, then decide whether to call.$$ , 28),
  ((select id from question_ids where question_order = 17), 3, $$Save the number as 'mystery' and wait to see if they call again.$$ , 52),
  ((select id from question_ids where question_order = 17), 4, $$Delete it and never think about it again.$$ , 74),
  ((select id from question_ids where question_order = 17), 5, $$Don't listen to voicemails.$$ , 93),

  ((select id from question_ids where question_order = 18), 1, $$Have a specific place, a backup, and a ranking of both.$$ , 8),
  ((select id from question_ids where question_order = 18), 2, $$Suggest something real within five seconds.$$ , 27),
  ((select id from question_ids where question_order = 18), 3, $$Say 'I'm easy' and mean it, sort of.$$ , 52),
  ((select id from question_ids where question_order = 18), 4, $$Say 'I'm easy,' hope they decide, subtly veto the one place I hate.$$ , 74),
  ((select id from question_ids where question_order = 18), 5, $$Say 'I'm easy,' and eat whatever appears in front of me.$$ , 93),

  ((select id from question_ids where question_order = 19), 1, $$Start something ambitious. I'll either finish it or have an interesting story.$$ , 7),
  ((select id from question_ids where question_order = 19), 2, $$Do a few things from my list — actually productive.$$ , 27),
  ((select id from question_ids where question_order = 19), 3, $$Browse my phone. Not sure what. Time passes.$$ , 55),
  ((select id from question_ids where question_order = 19), 4, $$Worry about the meeting and do nothing useful.$$ , 75),
  ((select id from question_ids where question_order = 19), 5, $$Sit and wait. It's not enough time to do anything real.$$ , 92),

  ((select id from question_ids where question_order = 20), 1, $$Flag the server, explain what happened, get it sorted with zero drama.$$ , 10),
  ((select id from question_ids where question_order = 20), 2, $$Mention it, accept whatever fix they offer.$$ , 30),
  ((select id from question_ids where question_order = 20), 3, $$Debate whether to say something for so long that the moment has passed.$$ , 58),
  ((select id from question_ids where question_order = 20), 4, $$Eat it anyway. Confrontation sounds worse than this meal.$$ , 76),
  ((select id from question_ids where question_order = 20), 5, $$Eat it and don't fully register it wasn't what I ordered.$$ , 94),

  ((select id from question_ids where question_order = 21), 1, $$Go over, say hi, catch up — turns out we have a lot in common.$$ , 7),
  ((select id from question_ids where question_order = 21), 2, $$Give the 'hey! how are you!' wave and mean it.$$ , 26),
  ((select id from question_ids where question_order = 21), 3, $$Smile and nod and drift toward a different aisle.$$ , 52),
  ((select id from question_ids where question_order = 21), 4, $$Change aisles before they see me.$$ , 73),
  ((select id from question_ids where question_order = 21), 5, $$Don't notice them until they tap me on the shoulder.$$ , 92),

  ((select id from question_ids where question_order = 22), 1, $$First up. Fully committed. No notes.$$ , 4),
  ((select id from question_ids where question_order = 22), 2, $$Do one song I actually know and enjoy it.$$ , 24),
  ((select id from question_ids where question_order = 22), 3, $$Wait until later in the night, then do a group song.$$ , 50),
  ((select id from question_ids where question_order = 22), 4, $$Hold the drinks, hold the coats, do not hold the mic.$$ , 73),
  ((select id from question_ids where question_order = 22), 5, $$Observe from a safe distance with a studied expression of mild amusement.$$ , 92),

  ((select id from question_ids where question_order = 23), 1, $$Have several fully-formed, aggressively specific opinions ready to go.$$ , 6),
  ((select id from question_ids where question_order = 23), 2, $$Share a genuine view, explain my reasoning.$$ , 28),
  ((select id from question_ids where question_order = 23), 3, $$Offer something mild that doesn't risk an argument.$$ , 54),
  ((select id from question_ids where question_order = 23), 4, $$Deflect with a joke, get a laugh, reveal nothing.$$ , 74),
  ((select id from question_ids where question_order = 23), 5, $$Say 'I don't really have strong opinions about stuff like that.'$$ , 92),

  ((select id from question_ids where question_order = 24), 1, $$Navigate by instinct. I've been to worse places with less information.$$ , 5),
  ((select id from question_ids where question_order = 24), 2, $$Pull over, restart the app, recalibrate, carry on.$$ , 25),
  ((select id from question_ids where question_order = 24), 3, $$Panic quietly while trying to remember the last instruction.$$ , 55),
  ((select id from question_ids where question_order = 24), 4, $$Call the person I'm meeting to warn them and stall.$$ , 74),
  ((select id from question_ids where question_order = 24), 5, $$Sit in the parking lot of wherever I am and rethink the day.$$ , 92),

  ((select id from question_ids where question_order = 25), 1, $$Sit near them, gently ask if they're okay. Mean it.$$ , 8),
  ((select id from question_ids where question_order = 25), 2, $$Catch their eye, give a small nod that says 'I see you.'$$ , 28),
  ((select id from question_ids where question_order = 25), 3, $$Feel bad for them, think about saying something, keep walking.$$ , 55),
  ((select id from question_ids where question_order = 25), 4, $$Look away quickly — don't want to intrude.$$ , 75),
  ((select id from question_ids where question_order = 25), 5, $$Walk past without processing what I saw.$$ , 94),

  ((select id from question_ids where question_order = 26), 1, $$Write it all down immediately — this is a story.$$ , 6),
  ((select id from question_ids where question_order = 26), 2, $$Tell someone about it. It's genuinely interesting, I think.$$ , 26),
  ((select id from question_ids where question_order = 26), 3, $$Spend five minutes trying to figure out what it means.$$ , 52),
  ((select id from question_ids where question_order = 26), 4, $$Notice it was weird, forget the details by breakfast.$$ , 74),
  ((select id from question_ids where question_order = 26), 5, $$Don't remember my dreams.$$ , 93),

  ((select id from question_ids where question_order = 27), 1, $$Read it fully, update my view if the evidence holds. My ego will survive.$$ , 7),
  ((select id from question_ids where question_order = 27), 2, $$Engage with it seriously, even if I end up disagreeing.$$ , 28),
  ((select id from question_ids where question_order = 27), 3, $$Skim it, feel vaguely unsettled, change nothing.$$ , 55),
  ((select id from question_ids where question_order = 27), 4, $$Send back a counter-article immediately.$$ , 73),
  ((select id from question_ids where question_order = 27), 5, $$React with a thumbs-up emoji and move on.$$ , 92),

  ((select id from question_ids where question_order = 28), 1, $$Find the most interesting-looking person nearby and start a conversation.$$ , 6),
  ((select id from question_ids where question_order = 28), 2, $$Explore the terminal, find food, settle into a good spot.$$ , 26),
  ((select id from question_ids where question_order = 28), 3, $$Find a seat, open my phone, power through the wait.$$ , 52),
  ((select id from question_ids where question_order = 28), 4, $$Feel mildly wronged and check the flight status every 12 minutes.$$ , 74),
  ((select id from question_ids where question_order = 28), 5, $$Sit at the gate and wait. That's what you do.$$ , 93),

  ((select id from question_ids where question_order = 29), 1, $$Lean slightly in their direction and eventually contribute a thought. Worth it.$$ , 5),
  ((select id from question_ids where question_order = 29), 2, $$Listen, try not to stare, feel like I'm watching a documentary.$$ , 27),
  ((select id from question_ids where question_order = 29), 3, $$Notice it briefly, then tune back into my own thing.$$ , 53),
  ((select id from question_ids where question_order = 29), 4, $$Put headphones in so I don't accidentally hear more.$$ , 74),
  ((select id from question_ids where question_order = 29), 5, $$I was already wearing headphones. I am sealed off.$$ , 93),

  ((select id from question_ids where question_order = 30), 1, $$Accept it gracefully and tell them the story behind it.$$ , 8),
  ((select id from question_ids where question_order = 30), 2, $$Say 'thank you' and mean it.$$ , 27),
  ((select id from question_ids where question_order = 30), 3, $$Deflect slightly — 'oh it was nothing, really.'$$ , 53),
  ((select id from question_ids where question_order = 30), 4, $$Immediately list everything wrong with it.$$ , 74),
  ((select id from question_ids where question_order = 30), 5, $$Say thanks, feel nothing, move on.$$ , 93)
on conflict (question_id, answer_order)
do update set
  answer_text = excluded.answer_text,
  score = excluded.score,
  updated_at = timezone('utc'::text, now());
