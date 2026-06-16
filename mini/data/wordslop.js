/*
- search for found groups and words
- groups of the same completion percent are sorted alphabetically
- clicking a group name in the log scrolls to the newly-found word
- save file names include today's date and time
- words can be typed with accent marks even if dataset doesn't have them
- percent found and total words are shown in group view
- message for empty groups
- words can be clicked to repeat their blurbs

- fungi
*/

SPA.data = {}
SPA.data.news = [
   "we added a search bar!",
   "thank u for being in the first group of wordslop players. we are fighting **tooth and nail** to add ur submissions and new features to enjoy!",
   "u can now use the up/down keys to return to previous words",
   "u can now save your progress as a file and bring it to another device",
   "hints were added",
   "experimental: nudges are given for suspected typos",
   "u can now copy word lists from a group",
   "thank u all for being some of the wordsloppers! we are slowly going through all the HUNDREDS of submissions, it's a huge help!",
   "thank you for beta testing **wordslop** :)",
   "totals are now shown when opening a group",
   "we added changelogs that show up automatically"
]

/*
 ██╗       ██╗  █████╗  ██╗ ████████╗
 ██║  ██╗  ██║ ██╔══██╗ ██║ ╚══██╔══╝
 ╚██╗████╗██╔╝ ███████║ ██║    ██║   
  ████╔═████║  ██╔══██║ ██║    ██║   
  ╚██╔╝ ╚██╔╝  ██║  ██║ ██║    ██║   
   ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═╝    ╚═╝   

You are a free person, however this game is best experienced without spoilers.

Scroll at your own risk.





































































I warned you...

*/




SPA.data.groupsText = `


###
[group name]
member word
multiple | members | in | one line
& subset group
# comment
&& #escaped symbols are doubled

[compact group] member1 | member2
###

[colors]
= colours
acorn
almond
amaranth
amber
amethyst
apricot
aqua
aquamarine
azure
beige / khaki
pale
black / noir
chrome
blonde / blond
blue
auburn
eigengrau / brain gray
blue-violet
blurple
blush
bronze
brown / brunette
buff
burgundy
camouflage / camo
carmine
carnelian
celadon
celeste
cerise
cerulean
champagne
charcoal
chartreuse
chestnut
cinnabar
copper
coral
cream
crimson / alizarin
cyan
dandelion
dark gray / dark grey
dark green
denim
ebony
ecru
eggplant
eggshell
emerald
fawn
firebrick
flame
flax
frostbite
fuchsia / fandango / pink-purple / pinkish-red / pinkish-purple / purple-pink
glaucous
gold / golden
gray / grey / grayscale / greyscale
green
hazel
hot pink
indigo
infrared / ir
ivory / off-white
lavender
light green
light orange
lilac
lime
magenta
mahogany
maroon / dark red
mauve
monochrome
moss
mustard
navy / navy blue
ochre
olive
olo "this color has only been seen by scientists shooting lasers into their eyes"
orange "the fruit actually came first - **orange** is **orange** because **oranges** are **orange**"
peach
periwinkle
pink
plum
puce
purple / violet / ourple "in ancient times, ^ was considered a valuable color because it needed thousands of snails to produce"
rainbow
red
rose
russet
salmon
scarlet
seafoam
sepia
sienna
silver / light gray / light grey
skin tone / skin color / skin colour
sky blue / light blue / baby blue
tan
taupe
teal
turquoise
ultramarine
ultraviolet / uv
umber
vantablack
vermilion / vermillion / red-orange / orange-red
viridian
white / blank
yellow

[collective nouns]
ambush
army
array
assembly / assemblage
band
embarrassment "a group of pandas"
mischief "a group of magpies"
batch
squad
cult
coven "a group of witches"
mass
clump
commune
battalion
legion
community
series
cavalry
infantry
cast
corporation
brotherhood
sisterhood
unkindness "a group of ravens"
regiment
population
duo
trio
class
squadron
loveliness "a group of ladybugs"
dazzle "a group of zebras"
waddle
kaleidoscope "a group of butterflies"
platoon
raft
clique
parliament "a group of owls"
bike
body
brood
bunch
business
cackle
camp
caravan
category
clan
cloud
clowder
cluster
clutch
flamboyance "a group of **flamingo**s"
clutter
coalition
coffle
collection
collective
colony
committee
company
pandemonium
congregation
convocation
court
crowd
drift
drove
family / fam
flange
flight
flock
flutter
formation
gam
gaggle
gang
gaze
group / grouping
herd
hive
horde
line
litter
lot
majority
mob
murder "yes, that's what a group of crows is called"
navy
nest
nuisance
organization / organisation / org
league
faction
pace
pack
parade
party
peep
people
plurality
pod
pounce
pride
protection
queue
rabble
rookery
school
shoal
sleuth
smack
society
streak
swarm
team
tribe
troop

[young nouns]
= diminutives / young names
baby
bobkitten
calf
babe
caterpillar
chick
boy
nauplius
girl
child
lamb
filly / fillie
juvenile
flapling
runt
tyke
bairn
chrysalis
codling
coglet
colt
cria
cub
duckling "this one doesn't seem so ugly"
eaglet
eyas
cygnet "a baby swan"
owlet
farrow
fawn
fingerling
fledgling / fledgeling
bastard
foal
froglet
fry
gosling "a baby goose"
newborn
grub
hatchling
hoglet
infant
joey
kid
kit
kitten
kitty
larva / larval / larvae
navy
nestling
nymph
embryo
zygote
fetus
piglet
polliwog / pollywog
polyp
puggle
pup
pupa / pupate
puppy
sapling
seedling
shoat / shote
spiderling
tadpole
toddler / tot
whelp
young
youth

[sounds]
= noises
& animal sounds
achoo / atishoo
ahem
awooga / aooga
echo
mantra / mantram
cackle
alarm / siren
beep
nom / nomnom / omnom / omnomnom
bonk / donk
thwack / thwock
slam
boop
squelch
crunch
crack
thunder
doot
mumble
bing
footstep "japan is turning these into electricity"
burp
wheeze
sob
clack
strum
pop
bang / bam / pow / boom / kaboom / blam / kablam / kapow
ching / cha-ching
chomp
choo / choo choo
clink / clank
crackle / crumple
ding
music
monotone
whisper
fizz
sizzle
flutter
ring
slosh
slurp
splash
shoo
tick / tick tock
tock
twang
vroom / room
yawn
zap
fah / fahh / fahhh / fahhhh / fahhhhh
whoosh / whooosh / whoooosh / whooooosh
pew
wham / whack
plop / plap
heartbeat / doki doki
boing

[animal sounds]
baa / bah / baah
bark / woof / arf / boof / ruff
bay
bell
blow
bray
brrp / burp
buck
speech / speaking / talking
noot
toot
gargle
bugle
huff / puff / chuff
yiff
wail
snicker
pant
gulp
sniff / snuff / snuffle / sniffle
yowl
buzz / bzz / bzzt
call / sing / song
caterwaul
caw / cah / cacaw / cacah
bloop
chatter / chitter
mimicry
cheep
chirp / chatterchirp
chuckle
cluck / click
bawk
cock-a-doodle-doo
coo
cough
creak / creek
croak / ribbit
cronk
crow
cry / bleat
dook
eek
fawn
gecker
glub / blub
gobble
growl / snarl / grr / grrr / gr / rawr / grrrr
grumble
grunt / bellow / groan
hee-haw
hiccup / hiccough
hiss / rattle
honk
hoofbeats
hoot / hoo / hoothoot
howl / awoo / woo / awooo / awo
hum
laugh / laughter
low
meh
meep
meow / mew / miao / miau / mreow / mrow / mrrp / nya / nyan
moan
moo / maa
neigh / whinny
oink
gurgle / orgle
peep
pipe
purr
quack
roar
rumble
scream / yell / shout / holler
screech
shriek
sigh
sneeze
snore
snort
squawk
squeak
squeal
swish
talk / speak
trill / chirrup
trumpet
tweet / twitter
warble
wheek
whine / whimper / mewl
whistle
whoop
yip / yap / yelp

[basic words]
= basic / common words
& pronouns
& interjections
a
about
after
all
everywhere
somewhere
anywhere
nowhere
still
forth
isn't
ago
must
hither
thither
whereof
wherein
albeit
utter
hence
henceforth
etc / et cetera
probably
whatsoever
same
whatcha
other
moreover
lots / a lot
extra
actually
most / mostly
mainly
least
moreso
again
only
also
gonna / finna
gotta
wanna
ain't
although
along
neither
either
next
first / 1st
might
may
here
anything
away
last
already
beneath
beyond
each
always
am
among
an
i'm
i'll
i've
i'd
and / &&
another
different
throughout
unless
unlike
any
anyway
are
around
as
at / @
be
because / cause / cuz / bc / cus
before
behind
beside
between
but
by
can
cannot / can't
thus
ever
could
did
didn't
couldn't
shouldn't
wouldn't
hadn't
haven't
herein
hereinafter
notwithstanding
do / doing
does
doesn't
don't
else
end
every
except
for
from
go / going / gone
have / has / had
how
however
if
in
into
is
just
later
let
like
many
few / fewer
maybe / mayhaps
more
less
much
never
nevertheless / nonetheless
no
none
nor
not
nothing
now
of / o'
off
often
okay / ok
on
once
onto
or
ought
out
over
perhaps / perchance
really
shall
should
since
so
some
something / smth
sometime
sometimes
everything
start
than
the
then
there
therefore / therefor
though / tho
through / thru
to / 2
too
toward / towards
under
until / til / till
unto
upon
very
via
was
well
went
were
when
whence
whenever
where
whereby
while
whilst
meanwhile
why
will
with / w//
within
without / w//o
won't
would
'ya
yet

[interjections]
= expressions / phrases / sayings / exclamations
ah / ahh / ahhh / ahhhh / aa / aaa / aah / aahh / aaah / aaahh / aaahhh
aha / ahah / ahaha / ahahah
alas
alright / aight
asap
aw / aww / awww / awwww / awh / awwh / awwwh / awhh / awwhh / awhhh
ay / aye
blah
bleh
bro / bruh / brah / bruv
btw
congratulations / congrats "for making the best game of the century?"
cool / rad / awesome / nice
damn / damnit / dammit / drat
durr
touché
dang / dangit
darn / darnit
dude
duh / duhh / duhhh
eh / ehh / ehhh / ehhhh
erm / ermm / ermmm / err
eek
yuh
save our ship / save our souls / sos
uh huh / yuh huh
nuh uh / uh uh
eureka
ew / eww / ewww / ewwww
for real / fr
gah
gg / good game
golly
good morning / gm "ready to start your day with wordslop?"
goodbye / bye / bye-bye / adios / sayonara "see u later"
goodnight / gn "sleep tight!"
gosh / goodness
mwah
brr / brrr / brrrr
boo
rah / rahh / rahhh / rahhhh
glhf
fafo
guh / gwuh / buh
gyatt / gyat
nevermind / nvm
ig
haha / ha / hah / hahah / hahaha
hehe / heh / heheh / hehehe / heehee
hello / hi / hey / greetings / aloha / hola / ni hao / konnichiwa / salud / howdy / hai / haii / haiii / hallo / 'ello / ahoy "hi there :)"
hm / hmm / hmmm / hmmmm
ho / hoho / hohoho
holy / moly
hoohoo
hooray / hoorah / hurrah / hip hip hooray / hip hip
amen
harrumph
hmph
hngh / ngh
pft / pfft / pffft / pftt / pfftt
tada
psh / pssh / psssh / pshh / psshh
ptui / ptooey
pish posh
tsk
tut
lmk
womp
no problem / np
bah humbug
boohoo
cheerio
cheers
crikey
rsvp
hallelujah
xo / xoxo / xoxoxo
huh / huhh / huhhh
idc
idk / i don't know "if you need help, try using the **hint** button!"
ikr
jeez / gee
jk / just kidding "oh, okay! :)"
lmao / lmfao
lol / lul / lolz / lulz
mhm / mmhm / mhmm / mmhmm
mm / mmm / mmmm / mmh / mmmh / mmhh / mmmhh / mhh
yolo
huzzah
sh / shh / shhh / shhhh / shush / hush
ngl
no / nope / nah / nay / naw
oh / ohh / ohhh / ohhhh
oi / oy
okay / ok
omg / omfg / oh my god
heck
omw
oof
ooh / oooh / ooooh / oo / ooo / oooo / oohh / ooohh
oops / oopsie / oopsy
ow / ouch / owie / owch / youch
please / pls / plz / plx
wee / whee / weee / weeee
woohoo
pst / psst / pssst / pstt / psstt
r.i.p.
rofl
agh / argh / ack / aargh
oop
ofc
egad / egads
fiddlesticks
fie
bless you / bless u
gesundheit
salutations
see you later / see u later / cya "alligator"
toodeloo
gee willikers
shoot
sorry "it's okay, friend :)"
stfu
sure
tbh
teehee
thanks / thank you / thx / ty / tysm "you're welcome!"
you're welcome / ur welcome / yw
smh
imo / imho
ttyl
iirc
dawg
ugh / ughh / uggh / ugghh / eugh
wah / wahh / wahhh / wahhhh / waa / waaa / waaaa
wbu
woot
g'day
yeehaw
uh / uhh / uhhh
um / umm / ummm / uhm / uhhm / uhmm
welcome
what's up / wassup / wazzup / waddup / 'sup / wsg / wsp "nothing much, you?"
whatever
woah / whoa
wow / wowza / waow / wowie / wowzers
gadzooks
wtf / wth
yahoo / wahoo
yay
yes / yep / ya / yeah / yup / si
yikes
yippee / yippie "YIPPEEEEE"
yo "yo"
yoohoo
yuck / yucky
yum / yummy / yummers
zzz / zzzz / mimi / mimimi / mimimimi "goodnight!"
hru
i.e.
e.g.
icl
idgaf / gaf
ijbol
brb
bbl
whew
phew
absolutely
definitely
totally
shit / crap
fuck
bullshit / bullcrap / horseshit / horsecrap
motherfucker / mf
afk

[pronouns]
each other|he|her|hers|herself|him|himself|his|I|it|its|itself|me|mine|my|myself|one|oneself|our|ours|ourself|ourselves|she|thee|their|theirs|them / 'em / em|themself|themselves|there|they|thine|thou|thy|thyself|us|we|what|which|who|whom|whomst|whomst'd've / whomstdve|whose|y'all / yall|y'all's|you / u|your / ur|yours / urs|yourself / urself|yourselves / urselves|you're / u're / ure|they're|someone / somebody / somepony|everyone / everybody / everypony|nobody / no one / nopony|anyone / anybody / anypony|whoever / whomever|ye|yous / youse
ze|zir|xe|xim|xer|xem|zem|xis|xir|zer|xey|xyr|xyrs|xemself|zemself|xemselves|zemselves|zirself
fae|faer|faeself / faerself
this|that|these|those
ae|aer|aerself|aers
eir|eirs|emself
hir|hirs|hirself
catself|dogself

[honorifics]
mr / mister
ms / miss
mrs / misses / missus
mistress
mademoiselle
mx / mg / mage
sir
dame
prof / professor
noble
father
captain
officer
saint / st.
phd
colonel
admiral
lieutenant
general
sergeant
dear
chancellor
esquire / esq
sire
maam / mam / madam / ma'am
dr / doctor / doc
lady / mlady / m'lady / ladyship / malady
lord / lordship
honor / honour
magistrate
majesty
highness
jr / junior
sr / senior / señor
señorita / señiorita
gentleperson / gentlepeople
gentleman / gentlemen
gentlewoman / gentlewomen / gentlelady
master
the honourable / the honorable / hon / hon'ble
messrs
beloved
don / doña / dom / donna / domn / doamnă / dona
excellency
rabbi
imam
khan
cadet
the reverend / the revd / the rev'd / the rev
mufti

[solfège]
"a solfège is a verbalization of a particular music note"
ut
do / doh
re
mi
fa / fah
so / sol
la
ti
di
ri
fi
si
li
ra / rah
me / meh
fe / feh
se / seh
le / leh
te / teh

[prefixes]
quetta-
ronna-
yotta-
zetta-
exa-
thera- / thero-
kibi-
mebi-
gibi-
tebi-
pebi-
exbi-
zebi-
yobi-
robi-
quebi-
andro-
lipo-
matri-
patri-
bronto-
hypno-
sino-
necro-
bacterio-
biblio-
gyno- / gyne-
keto-
acro-
endo-
intro-
peta-
tera-
cardio-
re-
quad- / quant-
quint- / penta-
hex- / sex-
sept-
oct- / octo-
exo-
bene-
giga-
mega- / megalo-
kilo-
hecto-
deca- / dec- / deka-
deci-
centi- / cent-
milli-
micro-
nano-
xeno-
xylo-
xantho-
pico-
femto-
atto-
zepto-
yocto-
ronto-
quecto-

afro-
after-
ambi-
amphi-
an- / a- / ana-
anglo-
ante-
anti-
apo- / ap-
arch-
astro-
auto-
back-
be-
bi-
bio-
sesqui-
ennea-
nona-
by-
circum-
cis-
con- / co- / com- / col- / cor-
contra- / contro-
counter-
cryo-
crypt- / crypto-
de-
demi-
demo-
deuter-
dia-
dis- / di- / dif-
down-
du- / duo-
eco-
electro-
en- / el- / em-
epi- / ep-
eu-
euro-
ex-
extra-
fore-
franco-
geo-
gyro-
hemi-
hetero-
hind-
hispano-
homo-
hydro-
hyper-
hypo-
ideo-
idio-
in- / il- / im- / ir-
indo-
infra-
inter-
intra-
iso-
italo-
macro-
mal-
maxi-
meso-
meta-
mid-
midi-
mini-
mis-
mono- / mon-
multi- / mult-
neo-
non-
ob-
off-
omni-
on-
ortho-
out-
over-
paleo-
pan-
para-
ped-
pen-
per-
peri-
photo-
pleo-
pod-
poly-
post-
pre-
preter-
pro-
pros-
proto-
pseudo-
pyro-
quadri-
quasi-
retro-
self-
semi-
socio-
step-
sub- / sup-
super-
supra-
sur-
syn- / sy- / syl- / sym-
tele-
trans-
tri-
twi-
ultra-
un-
under-
uni-
up-
vice-
with-

[time]
& days
& months
& seasons
afternoon / evening
century
dawn
day / daytime / daily
decade
dusk
twilight
before
now
during
never
soon / sooner
when
whenever
o'clock
after
semester
trimester
epoch
eon
era
generation
period
moment
earlier
early
fortnight / fortnightly
future
hour
late
later
upcoming / incoming
midnight
millennium / millennia
millisecond
minute / minutely
month / monthly
morning
nanosecond
night / nighttime
noon / midday
past
present / current / currently
season
second
week / weekly
biweekly
year / annum / annual / yearly
always
p.m.
a.m.
b.c. / b.c.e.
a.d.
new / recent / newly / recently
old
former / formerly
tonight
bedtime
teatime
yesteryear
forever / eternity / eternal / endlessness / eternally / endlessly
ancient / prehistory / prehistoric
modernity / modern

[days]
sunday | monday | tuesday | wednesday | thursday | friday | saturday
weekend | weekday | yesterday | today | tomorrow / morrow | overmorrow | ereyesterday

[months]
january | february | march | april | may | june | july | august | september | october | november | december

[seasons] summer | winter | spring | autumn / fall

[moon phases]
new
waxing crescent / crescent / waxing
first quarter / quarter
waxing gibbous / gibbous
full
waning gibbous
last quarter / third quarter
waning crescent / waning
supermoon / perigee
micromoon / apogee

[directions]
north / northern / northward / northbound
south / southern / southward / southbound
east / eastern / eastward / eastbound
west / western / westward / westbound
northeast / northeastern
northwest / northwestern
southeast / southeastern
southwest / southwestern
left / leftward
right / rightward
forward / front / frontward / straight
backward / back
up / upward / top
down / downward / bottom
horizontal / horizontally / latitude
vertical / vertically / longitude
diagonal / diagonally
sideways
above
ana
behind
ahead
below
beneath
beyond
caudal
cranial / cephalic
distal / outward / out / outside / exterior
dorsal
far
kata
near
palmar
port
proximal / inward / in / middle / center / centre / central / inside / interior / medial
radial
rostral
skyward
starboard
clockwise / counterclockwise

[actions]
= verbs
abolish
abort
abstain / abstinence
accelerate
regress
accept
bury
plea
warn
sharpen
excuse
nip
unite
remind
grant
rent
ascend / ascent
descend / descent
torrent
access
tangle
ward
eject
achieve
unlock
acquire
act
activate
gain
profit
add
adhere
adjust
putt
affect
age
agree
aim
allot
alter
alternate
amuse
annihilate
announce
annoy
answer
apologize / apology
appeal
applaud
apply
appraise / appraisal
appreciate
approve
argue
arrange
arrest
arrive / arrival
ask
assert
assist
assure
attach
attack
attempt
attract
aviation
avoid
await
backflip
bait
bake
balance
ban
banter
barbecue / barbeque
barf
barter
bash
bask
baste
bathe
battle
be / been
beam
beat / thrash / strike
beckon
befriend
beg
belch
believe / belief
bend
berate
bet
bicker
bid
bind / bound
birth / born
bit
bite
blame
blast
bleed
blend
bless
blink
block
blossom
blow
bludgeon
bluff
board
boast
bob
boil / evaporate
bombard
bore
borrow
bounce
bow
brag
brake
brand
brawl
breach
break / broke
breathe / breath "you are now breathing manually"
breed
brew
bring
bristle
broach
broadcast
broil
brought
budget
build / construct
bully
bump
bundle
burn
burrow
burst
bust
buy
call
care
carry
cartwheel
carve
cast
catch
caution
celebrate
censor
challenge
change
characterize
charge
chat
check
cherish
chew
chime
choice
choke
chop / axe
chore
chow
chuck
claim
clap
claw
clean
clear
cleave
climb
clip
close / shut
clot
clue
clump
coach
code / develop
coexist
collaborate / collab
collapse
collect
color / colour
combine
combust
come / came
commission
compare
compel
complete / finish
compose
compute
condense
conduct
confess / confession
connect
consider
consume
contact
contemplate
continue
contribute
control
cook
cope
copy
corral
correct
cost
cough
couple
cover
crack
cram
crank
crawl
create
creep
crouch
cruise
crumble
crunch
crush
cry
cuddle
cultivate
curse
customize
cut / slice
damage
dance
dare
dash
daze
deal
debate
debug
decay
decide
declare
decline
decouple
decrease
defeat
defend / defense / defence
defenestrate
define
deflect
deforest
delegate
delete
denominate
dent
deny
depart / departure
deploy
deposit
describe
deserve
desire
despise
destroy / destruct / wreck
dial
dig
dine
dip
direct
disagree
discard
discharge
discover
discuss
disguise
dislike
disobey
dispose
disrupt
distinguish
distort
distract
disturb
dive
divide
divorce
dodge
dominate
donate
done
dose
doubt
download
downvote
drag
drain
draw
dream
drew
drill
drink / chug
drip
drive
drool
drop
drown
dug
dump
dunk
dye
earn
eat / ate
edge
edit
elevate
email
emancipate
embroider
emphasize / emphasis
employ
empty
enamor / enamour
end
endure / endurance
enjoy
enlighten
enslave
enter
equip
eradicate
erase
erect
errand
escape
establish
estimate
etch
evacuate
evaluate
examine
exchange
exclaim
execute
exercise
exfoliate
exhale
exhibit
exist
exit
expect
experiment
expire
explain
explode
explore
extend
extinguish
extract
fail
faint
fake
fall
fancy
farm
fasten
favor / favour
feed
feel
fell
fellate
fend
fetch
fight / fought
fill
finalize
finance
find
fine
fire
fit
fitness
fix / repair
flake
flap
flare
flash
flee
flex
flick
fling
flip
flirt
flitter
float
flop
floss
flow
flush
fly / flew / flight
focus
fold
follow
force
forget
forgo
forgot
form
foul
found
fracture
fraternize
free
freeze
frighten
froze
fry
fuck
fumble
function
furrow
fuse
gag
gallop
gamble
game
gape
gasp
gather
generate
gesture
get / got / gotten
giggle
give / gave / given
glance
glare
glide
glint
glow
gnash
go
gobble
gossip
grab / grip
grapple
grasp
grate
greet
grin
grind
groom
grovel
grow / grown
growl / snarl
grumble
guess
guide
gulp
hack
haggle
haircut
hallucinate
halt
hammer
handle
handstand
hang / hung
happen
harm
harvest
haul
haunt
heal
hear
heave
heckle
help
hide
highlight
hike
hint
hire
hitch
hoard
hobby
hold
hollow
homework
hone
hook
hop
horrify
huddle
hug
hump
hunt
hurdle
hurl
hurry
hurt / injure
idle
ignore
illuminate
illustrate
imagine
imbue
imitate
impale
impend
implode
impregnate
impress
improvise
include
increase
indicate
indimidate
infect
infiltrate
inflame
inflict
inform
inhabit
inhale
inherit
inject
insert
insist
inspire
instruct
insult
integrate
interact
interrupt
introduce
invent
invest
irk
irritate
itch
jab
jam
jeer
jest
jiggle
jive
join
joke
journal
juggle
juke
jumble
jump / leap / leapt
jumping
keep / kept
kick
kickflip
kid
kink
kiss
knead
kneel
knit
knock
knockout / ko
knot
know / knew / known
knows
label
lack
lactate
lag
laugh / chortle / cackle
launch
lay
layer
leak
lean
learn
lease
leave
leer
lend
license / licence
lick
lie / lying
lift
light / lit
limp
linger
link
lip-sync
list
listen
live
load
loan
locate
look
loop
lose
lost
love
lunge
lure
make / made
manage
mangle
manipulate
manufacture
march
marinate
marry / marriage
mash
maul
meander
measure
meditate
meek
meet / met
melt
mend
merge
message / text
metamorphose / metamorphosis
micromanage
milk
mimic / mimicking
mince
mine
minus / subtract
misspell / mispell
mix
mock
model
mooch
morph
mortgage
motivate
mount
mourn
move
mow
muddle
multiply
mumble
munch
mush
name
nap
narrate
need
needs
nibble
nod
notify
nourish
nurture
obey
obfuscate
objectify
objection
obliterate
observe / watch
obtain
offend
offer
open
operate
oppose
orbit
order
organize
ostracize
outline
override
owe
own
pacify
paint
pant
parry
parse
part
pass / surpass
paste
pat
patch
patrol
pause
pay
payback
peck
pee / urinate
peek
peel
peer
perform
pester
pet
pick
picnic / picnicking
picture
pinch
ping
pitch
pivot
place
plan
play
plead
pluck
pogo
poison
poke
ponder
poop / poo / shit / crap / defecate
possess
posture
pour
power
practice
praise
prance
prank / mischief
pray / prayer
preach
predict
prepare
press
pretend
prevent
print
probe
process
procreate / procreation
produce
prohibit
project
promise
promote
pronk
propose / proposal
protect
protest
prove
provide
prowl
pry
pull
pump
punch / hit
punish
purchase
pursue / pursuit
push
put
queef
quench
quest / adventure / journey
question
quit
quiver
raid
raise
rally
ramble
rank
rant
reach
react
reaction
read
realize
reap
reassure
reboot
recall
receive
reckon
recline
recognize
recon / reconnaissance
recover
recreate / recreation
recycle
redo
reduce
reel
refer
reflect
refresh / reload
refund
refuse
regenerate
register
rejoice
relate
relay
relieve / alleviate
remember
remove
render
repeat
replace
replay
reproduce / sex / bang
request
require
rescue / save
research
reset
resolve
rest
restart
resume
retch
reuse
reveal
revenge
reverse / reversal
revive
rewind
rewrite
rhyme
rid
ride
rig
rinse
rip
ripple
rise
roam
rob
roost
rot
rotate
rove
row
rub
ruin
rule
run / sprint / jog / ran
rush
sack
sacrifice
sail
sample
sass
sat
satisfy
sauté
saw
say / speak / talk / communicate / tell / converse / conversation / speech / said
scam
scan
scare
scoop
scoot
scour
scout
scrape
scratch
scream
screw
script
scroll / swipe
sculpt
sear
search
see / sight / vision / seen
seek / sought
seep
seize
select
sell / sale / sold
send
sense
sent
separate
serve
service
set
settle
sever
sew
shag
shake
share
shatter
shave
shear
shed
shiver
shop
shorten
shot
shout
shove
show / present
shred
shush / hush
sift
sign
signal
silence
sing / sang / sung
sip
sit
sketch
ski
skip
slam
slap
slash
slay
sleep
slide / slid
slip
slit
slither
slouch
slow
slur
smash
smear
smile
smirk
smoothe
snap
sneak
sneeze
sniff / smell / scent
snip
snore
snuggle
soar
sob
socialize
solve
sort
sow
spam
spare
spell
spend
spew
spill
spin
spit
spite
split
splurge
spoil
spook
sport
spot / notice
spout
spray
spread
spy / snoop
squat
squeeze
squirm
squish
stab
stack
stain
stalk
stamp
stand
stare
stargaze
start / begin
stash
stay
steal
steam
steer
sting
stir
stitch
stomp
stop
stot
strangle
stream
stretch
strip
stroke
struggle
study
stuff
stumble
stun
stutter
subject
submit
subscribe
suck
sue
suggest
summon
surround
sustain
swallow
swap
swat
sway
swear
sweep
swell
swim
swing
swoop
taint
take
tap
task
taste
taunt
tax
teach
tease
teleport
tempt
tend
testimony
think
thought
thrift
throw
thump
tickle
tiff
time
tire
toil
toll
torture
toss
touch
tow
trade
trail
transfer
transform
transition
translate
transport
travel
triangulate
trick
trigger
trim
trip
trump
try / tried
tuck
tug
tumble
tune
turn
tussle
twirl
twist
twitch
undo
unfasten
unfollow
unhand
unload
unpack
unsubscribe
update
upgrade
upload
upvote
urge
use / utilize
vacate
vacation
vandalize / vandalism
vape
venerate
verify
verse
video
view
visit
vote
vow
wade
wail
wait
waive
wake / awake / awaken / awoken
walk / step
waltz
wander
want
warp
wash
waste
wave
wear
weave
wed
wedgie
weep / wept
weigh
weld
wheeze
whip
whisk
whistle
wield
wiggle
wilt
win
wink
wipe
wish
withdraw
wobble
wonder
work / labor / labour
worship
wound
wrangle
write
yank
yell
yield
yoink
zip

[size]
= sizes
ample
behemoth
big
broad
bulky
capacious
chubby
chunky
bigger / larger
biggest / largest
colossal
ultimate
compact
grand
pygmy
deep
oversized
diminutive
enormous
epic
fat / fatty
gargantuan
xl / xxl / xxxl / xxxxl
giant
gigantic
ginormous
goliath
hefty
high
huge
humongous "humongous what?"
immense
infinitesimal
itty bitty / itty / bitty
jumbo
large
lean
lil
little
long
macroscopic / macro
major
mammoth
massive
maximal / maximum / max
meagre
medium
mega
microscopic / micro
midget
miniature / mini
minimal/ minimum / min
miniscule / minuscule
minor
minute
moderate
monstrous
narrow
obese
overweight
petite / petit
pipsqueak
puny
shallow
short
sizable / sizeable
skinny
slender
slim
small / smol
substantial
super
tall
thick
thin
tiny / teeny / teeny tiny / teensy
titanic
tremendous
ultra
undersized
underweight
vast
voluminous
wee
wide

[shapes]
= geometry
65537-gon
angle
antiprism
apeirogon
arrow
capsule
balbis
bipyramid
cardioid
heptagram / septagram / septegram / septogram
wedge
octagram
gömböc
myriagon
manifold
heptadecagon
chiliagon
paraboloid
hyperboloid
enneadecagon
centigon
chevron
circle / round
cone / conic
crescent / moon
cross / plus / +
cube / cubic
cuboctahedron
cuboid
curve / arc
cylinder
decagon
diamond / lozenge
digon
disc / disk
dodecagon
dodecahedron
dot / point
ellipsoid / ovoid
flexagon
zigzag
fractal
mandelbrot
frustum
gyroid
heart
helix / helical
hendecagon
heptagon / septagon / heptagonal / septagonal
hexaflexagon
hexagon / hexagonal
hexagram
hexahedron
hyperbola
hypercube
hypersphere
icosagon
icosahedron
icosidodecahedron
kite
klein bottle
lemniscate
line / linear
lune
milligon
mobius strip
monogon
nonagon / enneagon
noperthedron
octagon / octagonal
octahedron
oloid
oval / ellipse
parabola
geodesic
decahedron
cycloid
parallelogram
pentagon / pentagonal
plane
polygon
polyhedron
prism
pyramid
quadrilateral
quatrefoil
rectangle / rectangular
rhombicosidodecahedron
rhombicuboctahedron
rhombohedron
rhomboid
rhombus
scutoid
sector
semicircle
semisphere / hemisphere / dome
sphere / orb
spiral
spirolateral
square
squircle
star / pentagram
stripe
superellipse
tesseract
tetrahedron
tetromino
torus / ring / annulus
trapezoid / trapezium
trefoil
triangle / trigon
tube
undecagon


[animals]
= creatures / wildlife / life / fauna / pet / critters
& mammals
& birds
& reptiles
& amphibians
& fish
& bugs
& crustaceans
& mollusks
& cephalopods
& hybrid animals
flatworm / flat worm / planarian / planaria / tapeworm / cestode / fluke
nematode / roundworm / eelworm / hookworm
jellyfish / jelly
zooplankton / plankton
lancelet / amphioxus
leech
hydrozoan / hydrozoa
hydra
man o' war / man-of-war / man-o'-war / man o war / man of war
siphonophore
coral / polyp
tunicate
echinoderm / echinodermata
sponge / seasponge "fun fact: they don't really live in **pineapple**s"
starfish / sea star / asteroid
urchin / sea urchin
sand dollar / sea cookie / snapper biscuit / pansy shell / sand urchin
anemone / sea anemone
velvet worm / peripatus / onychophoran
horseshoe crab
sea spiders
sea cucumber
tardigrade / water bear / moss piglet "these tiny animals can survive practically anywhere, even outer space"
parasite
tubeworm / bristle worm
bobbit worm
myxozoan / myxozoa
crinoid / feather star / sea lily / comatulid
bloodworm
pinworm / threadworm / seatworm
arrow worm / chaetognath
lungworm

[mammals]
& cats
& dogs
& bears
& rodents
& equines
& primates
& marsupials
& cetaceans
aardvark / antbear
aardwolf
treeshrew / banxring
alpaca
anteater
tenrec
platybelodon
antelope
saiga
sitatunga / marshbuck
armadillo
badger
honey badger
bat / flittermouse "the only mammal that can truly fly!"
bison
boar
buffalo "'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo' is a valid English sentence"
texas longhorn / longhorn
tamaraw
anoa / sapiutan
kouprey
camel / dromedary / bactrian
cattle / cow / bull / bovine / kine / calf
aurochs
coati
deer / buck / doe / stag / hart / hind / fawn
dik-dik
dugong / sea pig
echidna / spiny anteater / puggle "the other mammal that lays eggs"
elephant "these are the world's largest land animals"
elephant seal
civet
elk / wapiti
ferret
gazelle
springbok / springbuck
pronghorn / prong buck
gerenuk
bluebuck / bloubok
giraffe / camelopard
okapi / forest giraffe / zebra giraffe
goat / billy
fossa
gaur / indian bison
gayal / mithun / drung ox
mouflon / moufflon
aoudad / barbary sheep
banteng / tembadau
ibex
chevrotain / mouse-deer
guanaco
hare / jackrabbit / leveret
hedgehog / hedgie / hoglet "hedgehogs are lactose intolerant"
gymnure / moonrat
hippopotamus / hippo / river horse "hippos are related to **whale**s"
hyrax / dassie / coney
impala / rooibok
kinkajou
llama / lama
mammoth
manatee / sea cow
mastodon
meerkat / suricate
mink
mole
mongoose
moose
megaloceros
mountain goat
muskox
hyena / hyaena
otter / sea otter
mustelid
fisher / fishercat "these creatures sound like screaming babies, very scary"
ox / oxen
pangolin "their cool scales have caused them to be widely trafficked"
peccary / javelina / skunk pig
pig / hog / swine / piggy / piglet / sow "a ^ physically can't look up at the sky"
platypus / duckbill / duck-billed "one of the only mammals that lay eggs"
polecat / zorilla / zorille / zoril
rabbit / bunny / bnnuy / bnuuy / bnuny / bnuyy / cottontail "rabbits only blink 10-15 times in an hour"
tapeti
grison
solenodon
raccoon / racoon / trash panda
linsang
oyan
red panda "red pandas are technically not pandas, nor bears!"
reindeer / caribou
genet
rhinoceros / rhino
elasmotherium
seal / pinniped
sea lion
sheep / ram / ewe / lamb / ovine
skunk
sloth "sloths are the slowest mammals on earth"
stoat / ermine
tahr
takin
tapir
urial
vicuña / vicuna
babirusa / deer-pig
walrus
warthog
bushpig
olingo
tayra
weasel
marten
pika
wildebeest / gnu
wolverine
yak
zebu
binturong / bearcat "the bearcat is not a bear, nor a cat"
dimetrodon

# bovids (deer, antelopes, ...)
carabao
oryx
gemsbok
duiker
topi
nyala
blackbuck
addax / white antelope / screwhorn antelope
hartebeest
kudu
klipspringer
lechwe
oribi
kob
waterbuck
bushbuck
eland
saola / spindlehorn
brocket
pudu
chital / spotted deer / axis deer

[cats]
= cat / feline / kitty / kitten / felid / big cat / bigcat / gato / pussy / pussycat / neko / tomcat
"good kitty!"
abyssinian
angora
bay cat
bengal
bicolor / bicolour / harlequin
birman
black-footed cat / small-spotted cat
bobcat / bobkitten
bobtail
bombay
calico
caracal / floppa "it's big floppa!"
chartreux
cheetah / gepard
cougar / mountain lion
fishing cat
flat-headed cat
geoffroy's cat
golden cat
himalayan
jaguar
jaguarundi
jungle cat / reed cat / swamp cat
khao manee
kodkod / güiña
korat
leopard
leopard cat
lion / lionness / lioness / leo "pretty much all lions live in **Africa**"
longhair
lykoi / wolf cat / werewolf cat
lynx
maine coon
marbled cat
margay
mau
mountain cat
munchkin
napoleon / minuet
nebelung
neva masquerade
ocelot / ozelot
ocicat
oncilla / tiger cat / tigrillo
pallas's cat / pallas cat / pallas
pampas
panther / pantheress
persian
puma
ragamuffin
ragdoll
rex / selkirk
russian blue
rusty-spotted cat
saber-toothed tiger / smilodon / saber-toothed cat / saber-tooth / sabertooth
sand cat
serval
shorthair
siamese
singapura / kucinta
snow leopard
snowshoe
sokoke
sphynx "these cats are known for their lack of fur"
tabby
tiger / tigress "their skin is also striped, much like their fur"
tonkinese
tortoiseshell
toyger
turkish van
tuxedo / tuxie
wildcat
wirehair

[bears]
= ursids
black bear / black
brown bear / brown / kodiak bear / kodiak
grizzly bear / grizzly
panda / panda bear / giant panda
polar bear / polar
sloth bear / indian bear
spectacled bear / andean bear / spectacled
sun bear
spirit bear / kermode bear / spirit / kermode

[dogs]
= dog / doggy / puppy / doggo / pupper / canine / canid / pooch / canis / pup / bitch
"dogs, in the broadest sense"
aardwolf / maanhaarjakkals
affenpinscher
afghan hound / afghan
aidi
akita
arctic fox
azawakh
schnauzer
goldendoodle
lhasa apso
pekingese
saluki
weimaraner
hachikō
lapdog
barbado
barbet
yorkshire / yorkie
cockapoo
ridgeback
basenji
timberwolf
basset
spitz
beagle
beauceron
bichon frisé / bichon frise / bichon
bloodhound
boerboel
bolognese
borzoi
bouvier
boxer
bracco
briard
bulldog / frenchie
bully
maltipoo
wolfhound
setter
heeler
bullmastiff
bush dog
calupoh
cane corso
cattle dog
chihuahua
chow chow
collie / border collie
coonhound
corgi
coyote
dachshund / weiner dog / hotdog / dacshund / sausage dog
papillon
eskimo
culpeo
africanis
xoloitzcuintle / xoloitzcuintli / xoloitzquintle / hairless dog / xolo
vizsla
dalmatian
dhole
dingo
dire wolf
dobermann pinscher / pinscher / doberman pinscher / doberman
doodle
fennec fox
fox / vixen / vulpine / vulpes "the **Scandinavian red fox** has the scientific name 'Vulpes vulpes vulpes'"
great dane / dane
greyhound / grayhound
griffon
havanese
hokkaido / ainu / ainu-ken / seta
hound
husky
jackal
kelpie
klee kai
labradoodle
laekenois
leonberger
malamute
malinois
maltese
mastiff
mountain dog
mutt
newfoundland
picard
pitbull
pointer / english pointer
pomeranian
poodle
pug
pyrenees
raccoon dog / tanuki
retriever / labrador retriever / lab / labrador / golden retriever
rottweiler
saint bernard
samoyed
sennenhund
shar pei
sheepdog
shepherd / german shepherd / australian shepherd / aussie
shiba inu / shibe
shih tzu / shitzu
spaniel / cocker spaniel / cocker
staffordshire / staffie
terrier
tervuren
tibetan fox
whippet
wolf

[rodents]
agouti
beaver / bober
capybara "these are the biggest rodents on earth"
chipmunk
dormouse / door mouse
gerbil
chinchilla
degu
nutria / coypu
gopher
groundhog / woodchuck
guinea pig / cavy
hamster / hampter
jerboa
kangaroo rat
lemming
marmot
mole rat / mole-rat / naked mole-rat
mouse
muskrat
porcupine
prairie dog
rat
springhare
squirrel "squirrels can pretty much survive any fall"
viscacha
vole

[equines]
= equus / equids
horse / steed / mare / stallion / colt / foal / jack / jenny / filly / fillie / gelding
donkey / ass / jackass
mule / hinny / hinnie
pony
quagga
tarpan
takhi / przewalski's horse
zebra
onager / hemione
eohippus
brumby
kiang
mustang
unicorn / pegasus / alicorn "we'll count this one"
clydesdale
secretariat
jennet
mesohippus
thoroughbred
appaloosa
morgan
shetland / sheltie
hyracotherium
palomino
kulan
shire
standardbred / trotter
draft / draught / dray / carthorse / work horse / heavy horse
arabian
ardennais
asturcón
auvergne
auxois
axios
boerperd
campolina
castillonnais

[primates]
ape
aye-aye
capuchin
baboon
bonobo
caveman
chimpanzee / chimp "random chimp event"
gibbon
siamang
saki
potto
panin
colobus
gelada
guenon
kipunji
mangabey
talapoin
langur
lutung
surili
muriqui
angwantibo
howler "these monkeys **scream** to communicate and defend their territory"
galago / bushbaby
gorilla "but would it win against 100 men?"
human / homo sapiens / person / people / man / men / woman / women / individual "that's us!"
homo luzonensis / callao man / ubag
lemur
loris
macaque
mandrill
drill
indri
sifaka
marmoset
monkey / simian
neanderthal / neanderthalensis
homo ergaster
silverback
orangutan "yes, there's no 'g' at the end"
proboscis monkey
spider monkey
tamarin
tarsier
uakari
vervet
colugo "technically not a primate, but it looks like one, also very funny"
australopithecus
homo habilis
homo erectus
gigantopithecus
homo heidelbergensis
ardipithecus
sahelanthropus
denisovan
homo antecessor
homo naledi
homo rudolfensis

[marsupials]
bandicoot
bettong
dunnart
kangaroo / wallaroo / joey / roo "kangaroos can't jump backwards.. they also can't walk at all"
koala / drop bear "these marsupials have a very specific diet of poisonous leaves"
numbat / noombat / walpurti
opossum
possum
quokka
quoll
yapok / water opossum
shrew
sugar glider
tasmanian devil
thylacine / tasmanian tiger / tasmanian wolf
tree-kangaroo / tree kangaroo
wallaby
wombat "their poop is cube-shaped"
pademelon
cuscus
mulgara
bilby
potoroo
phascogale / wambenger / mousesack
caenolestid / rat opossum / shrew opossum
kowari

[cetaceans]
beluga
dolphin "they seem to enjoy the venom of **pufferfish**"
humpback / humpback whale
narwhal "their iconic tusk is actually a large tooth"
orca / killer whale "some ^s have started attacking boats, and the behavior is spreading"
porpoise
vaquita
tucuxi
whale "the **blue whale** is the largest animal still alive"
cachalot / sperm whale
baiji "sadly, we aren't sure if these dolphins are still around"
rorqual
bowhead
basilosaurus
pakicetus "this cetacean still had legs and could walk on land"
irrawaddy

[birds]
= bird / birdy / avian / birb / birdie
accipiter
albatross
anhinga / darter / snakebird / water turkey
ani
hornero
nothura
muscovy duck / muscovy
lancebill
woodstar
limpkin / carrao / courlan / crying bird
willet
greenshank / shank
puffbird
aracari
piculet
antshrike
earthcreeper
palmcreeper
groundcreeper
manakin
cotinga "beautiful blue birds!"
mourner
becard
tyrannulet
flatbill
conebill
turca
huet-huet
brilliant
stone-curlew / dikkop / thick-knees
humboldt
kiskadee
plushcap
caracara
dipper
bearded vulture / lammergeier
stubtail
sunbittern
wallcreeper
bluebill
argus
babbler
oropendola
hihi / stitchbird
'akikiki
'akiapōlā'au / 'akiapola'au
'amakihi
auk
avocet
awlbill
cyrilavis
sungrebe
kagu / cagou
mihirung
'i'iwi
sapayoa
tropicbird
drongo
kumimanu "an extinct species of giant penguin"
perplexicervix
barbet
barbthroat
kelenken / terror bird
baza
mousebird
tsidiiyazhi
accentor
longmornis
bee-eater
bellbird
pīpipi
birds-of-paradise
bittern
blackbird
shearwater
wattlebird
honeyeater
moa
nēnē
killdeer
sanderling
grebe
junco
thrasher
merlin
gallinule
flicker
veery
vireo
parula
tanager
dowitcher
bunting
vanga
xenops
jaeger
nighthawk
takahe
goatsucker
twistwing
songlark
spiderhunter
triller
pitta
passerine
peewee
shoveler
canvasback
redhead
turnstone
sora
bobwhite
chukar
waterthrush
longspur
adélie
courser
kererū
fantail
crossbill
whip-poor-will
dunlin
yellowlegs
bluebird
bobolink
boobook
booby
broadbill
bufflehead
bullfinch
bushtit
buzzard
cahow
canary "these birds were used in coal mines to warn miners of toxic gases"
capercaillie
capuchinbird
cardinal
carib
catbird
chachalaca
chaffinch
chickadee / tit / titmouse / titbird
frogmouth
silvereye / wax-eye / tauhou
chicken / rooster / hen / cock / chick / chook / pullet / poultry "chickens can see ultraviolet (we can't)"
silkie / silky / silk chicken
cockatiel
cockatoo
comet
condor
conure
coot
coquette
cordonbleu
cormorant
coronet
coua
coucal
cowbird
crake
crane
creeper / treecreeper "they aren't just exploding leaf things!"
crow / corvid "some crows are able to use tools"
cuckoo
curassow
curlew
dodo
dove
dovekie
duck / drake / mallard / duckling "got any grapes?"
eagle / erne / eaglet "bald eagles use the same nest across many years"
eider
emerald
emu "in 1932, australian soldiers lost a war to these flightless birds"
falcon / peregrine / kestrel
finch / goldfinch
firecrown
flameback
flamingo "while beautiful, they aren't born pink like that"
flowerpecker
flowerpiercer
flufftail
flycatcher
fowl / landfowl / galliform / waterfowl / gamefowl
francolin
cassowary
fody
gadwall
gamebird
gyrfalcon
galah
gentoo
gnatcatcher
go-away-bird
godwit
goldeneye
goose / gosling "**canada geese** mate for life!"
goshawk
grackle
griffon
grosbeak
grouse
guan
guineafowl
gull / seagull
harrier
hawk / eyas
hermit
heron / egret
hoatzin
hobby
honeycreeper
hoopoe
hornbill
houbara
hummingbird / hummer "a species called bee hummingbirds are the smallest birds on earth"
ibis
inca
jabiru
jackdaw
jay / blue jay
junglefowl
kakapo
kingbird
kingfisher
kinglet / crest
kite
kiwi / kiwibird
kookaburra
lark / meadowlark
liwi
loon
kākā
lovebird
lyrebird / menura
macaroni "yes, there's a **penguin** called ^"
macaw
magpie
magpie-jay
maileefowl
malkoha
maloe
martin
megapode
merganser / goosander
mesite
minla
mockingbird
moli
moorhen
motmot
mourning dove
myna / mynah
nativehen
nightingale
nightjar
nuthatch
oilbird
openbill
oriole
orpendola
osprey
ostrich "these flightless birds have the largest eggs of any living species"
ovenbird
owl "who?"
parakeet / budgie / budgerigar
woodswallow
weebill
kea
lory
lorikeet
noddy
frigatebird
parrot / eclectus
parrotlet
partridge
pauraque
peafowl / peacock / peahen "peacocks are actually the male peafowls"
pelican
penguin "flightless, but they make up for it by being excellent swimmers"
petrel
phalarope
pheasant
phoebe
picathartes / finfoot / bald crow
pigeon / rockdove "did you know pigeons produce milk?"
piper
pipit
pitohui
plains-wanderer
plantain-eater
plover / lapwing / dotterel
poorwill
potoo
ptarmigan
puffin
purpletuft
quail
quelea
quetzal
rail
ratite
raven "one of the most quotable animals"
caique
rayadito
rhea
roadrunner "they're not just cartoon characters!"
robin
rockfowl
rockhopper
rook
rosefinch
sandgrouse
sandpiper
sapsucker
scaup
scoter
screamer
secretary / secretary bird
seriema
sheathbill
shelduck
shima enaga / japanese snow fairy
shoebill stork / shoebill "they sound scary.."
shrike
sicklebill
siskin
siva
skylark
smew
snipe
snowcock
solitaire
songbird
sparrow
sparrowhawk
spatuletail
spoonbill
spurfowl
starling
stilt
stonechat
stork
sunangel
sunbeam
sunbird
sungem
surfbird
swallow
swamphen / pūkeko
skimmer
oystercatcher
skua
shag
honeyguide
swan / cygnet
swift / sweep / colly "chimney swifts rely on human structures, like chimneys, to nest in"
swiftlet
tapaculo
teal "yes, the color is named after the bird"
tern
thick-knee
thrush
tinamou
tinkerbird
toucan
toucanet
towhee
tragopan
treepie
treerunner
treeswift
trumpter
tui
turaco
turkey
turkey vulture
tyrant
umbrellabird
velvetbreast
violetear
vulture
wader
warbler
waterhen
waxbill
waxwing
weaver
whimbrel
whistling-duck
widowbird
wigeon
woodcock "they walk really funny!"
woodcreeper
woodhaunter
woodnymph
woodpecker "these birds wrap their tongues around their skulls to prevent concussions"
wren
yellowhammer
yellowthroat
wryneck
falconet
oxpecker
pratincole
guillemot
gannet
fulmar
razorbill
redwing
wagtail
linnet
goldcrest
firecrest
chiffchaff
kittiwake
whitethroat
redstart
blackcap
brambling
dunnock
stint
hawfinch
pochard
redshank
redpoll
ouzel
trogon
wheatear
whinchat
pintail
chough
nutcracker
cock-of-the-rock
bustard
jacobin
bulbul
whydah
bluethroat
onagadori
sheartail
jacana
longclaw
yellowhead / mohua
manucode
riflebird
dickcissel
antbird
buttonquail
hamerkop
indigobird
oxbird
woodpigeon

[reptiles]
= reptile / reptillian
& dinosaurs
alligator / gator "see you later!"
amphisbaenian / worm lizard
anaconda
anole
asp
tuatara
adder
basilisk
boa / constrictor
sea snake
goanna
whiptail
caiman / cayman
chameleon
cobra
cornsnake
crocodile / crocodilian / croc "their tongue is held in place by a membrane, making it immovable"
dragon / komodo dragon "yes, there are real animals called dragons"
gecko "all members of the **mourning gecko** species are female"
gharial / gavial
hognose
gila monster
iguana
kingsnake
lizard
monitor lizard / monitor
python "one once swallowed a woman whole"
krait
rattlesnake / rattler
sea turtle
skink
snake / serpent / snek "snakes don't blink, they have a transparent **brille** covering their eyes"
copperhead
cottonmouth
tegu
agama
galliwasp
boomslang
terrapin / water tortoise / pond turtle / pond slider / slider
mata mata
jararaca / yarara
tortoise
turtle
urutu / pit viper
viper
egg-eater / egg-eating snake
mamba
taipan "one bite of the venomous **inland taipan** could kill 250,000 mice"
titanoboa

[dinosaurs]
= dinosaur / dino / dinosaurus
"dinosaurs, and some related"
abelisaurus
acrocanthosaurus
albertosaurus
allosaurus / allosaur
amargasaurus
andesaurus
ankylosaurus / ankylosaur
archosaur
nyasasaurus
aardonyx
metriacanthosaurus
achillobator
atrociraptor
austroraptor
bambiraptor
juravenator
saurposeidon
mamenchisaurus
apatosaurus / apatosaur
archaeopteryx
argentinosaurus
lystrosaurus
baryonyx
brachiosaurus / brachiosaur
brontosaurus
carnotaurus
ceratosaurus
chasmosaurus
coelophysis
compsognathus
corythosaurus
dakotaraptor
deinocheirus
deinonychus
dilophosaurus
dimetrodon
diplodocus
diplophosaurus
dreadnoughtus
edmontosaurus
euoplocephalus
europasaurus
gallimimus
giganotosaurus
gorgosaurus
herrerasaurus
ichthyosaurus / ichthyosaur
iguanodon / iguanadon
kentrosaurus
lambeosaurus
leaellynasaura
maiasaura
megalosaurus
megaraptor
microraptor
minmi
mosasaurus / mosasaur
nigersaurus
ornithomimus
oviraptor
pachycephalosaurus
pachyrhinosaurus
parasaurolophus
plateosaurus
plesiosaurus / plesiosaur
protoceratops
psittachosaurus
pteranodon
pterosaur / pterodactyl / pterodactylus "they technically aren't dinosaurs!"
quetzalcoatlus
sinosauropteryx
spinosaurus / spinosaur
stegoceras
stegosaurus / stegosaur
stenonychosaurus
styracosaurus
suchomimus
tarbosaurus
therizinosaurus
triceratops
troodon
tyrannosaurus / tyrannosaurus rex / t-rex / trex / t rex / rex "these dinos stood up to 12 feet high, and were as long as 40 feet!"
utahraptor
velociraptor / raptor
yutyrannus
zuniceratops
asilisaurus
bonitasaura
ouranosaurus
gargoyleosaurus
caudipteryx
leptoceratops
aralosaurus
manipulonyx
prenocephale
tuojiangosaurus
sinraptor
navaornis
zalmoxes
bathornis
euhelopus
anacronornis
acristavus
tawa
borealopelta
falcatakely
maip
agilisaurus
limusaurus
liaoningosaurus
brachytrachelopan
regaliceratops
datanglong
jakapil
rinconsaurus
asteriornis
corythoraptor
thescelosaurus
jobaria
nqwebasaurus
scelidosaurus
ichthyornis
tenontosaurus
enigmacursor
masillaraptor
wintonotitan
barosaurus
carcharodontosaurus
kelumapusaura
mononykus
tarchia
rapetosaurus
patagornis
tethyshadros
longipteryx
palaeotis
rajasaurus
moabosaurus
asfaltovenator
silesaurus
koreanosaurus
elasmosaurus
mixosaurus
aeolosaurus
lythronax
morrosaurus
natovenator
fukuiraptor
miragaia
tsintaosaurus
hadrosaur
buitreraptor
shantungosaurus
sauropelta
muttaburrasaurus
einiosaurus
sinosaurus
saltasaurus

[amphibians]
axolotl "these salamanders have the remarkable ability to regenerate lost legs"
bullfrog
caecilian / caecillian
dart frog
frog / froggy
hellbender / hellbender salamander
newt
olm / proteus
xenopus
peeper
mudpuppy
salamander
spadefoot / spadefoot toad
tadpole / polliwog / pollywog "baby amphibians go through **metamorphosis**, most famously seen in frog tadpoles"
toad
tree frog
pobblebonk "didn't think that was real, huh?"
rainfrog
mountain chicken

[fish]
= fih / fishy / fishies
amberjack / yellowtail
anchovy
angelfish
anglerfish / angler "the glowy ones are female - the males are tiny and latch onto mates forever"
anthias
arapaima / pirarucu / paiche
archerfish "this fish has great eyesight, able to shoot targets outside of water!"
arowana / arowanna
asp
whitetip
barb
knifejaw
lumpsucker / lumpfish
sacabambaspis "wow that's ugly"
barbel
fry / whitebait
cabezon
aholehole
alfonsino / alfonsin / imperador
alligatorfish
gulper eel / pelican eel
john dory
moorish idol
snailfish / sea snail
pearlfish
dragonet
barracuda
barramundi
barreleye
bass / seabass
batfish
beardfish
betta "these fish fight each other with their large tails for potential mates!"
bichir
bitterling
bleak
seadragon
goldeye / goldeneye
mooneye
blenny
blobfish "the ugly caricature is actually a dead one due to extreme pressure drop"
blowfish / pufferfish / puffer "they can be eaten as **fugu**, but only when properly prepared"
spikefish
spearfish
tonguefish
telescopefish
tigerfish
weakfish
milkfish
sablefish / sable / candlefish / snowfish / coalfish
croaker
sheatfish
blindcat
cavefish
bull shark
gulper shark / gulper
blacktip shark / blacktip
requiem shark / requiem
whalefish
mosquitofish
leatherjacket / leather jack
grunion
greenland shark
nurse shark
bluefish
bluegill
arandaspis
dunkleosteus
haikouichthys
bonefish
bonito
boops boops
bottomfeeder / suckermouth
bowfin
boxfish / cofferfish / cowfish / trunkfish
bream
brill
bristlemouth "the most common fish on earth, huge swaths live beneath the oceans"
brotula
buffalofish
burbot
eelpout
elasmobranch
megrim / whiff
razorfish
basa
butterflyfish
capelin
grouper
cardinalfish
carp
catfish
candiru "this blood-sucking fish has been known to enter the bodies of swimmers"
catshark
char / charr
chimaera / chimera / spookfish / rat fish / rabbit fish
chromis
chub
chubsucker
cichlid / livebearer / geophagus
cisco
clownfish / clown / anemonefish "when a female clownfish dies, a male can become female to balance it out"
saugeye
cobia
cod / codling
coelacanth "they call it a **living fossil** due to its species' age"
conger
corbina
corydoras
crappie
cusk / cusk-eel
dab
dace
damselfish
danio
darter
discus
doctorfish
dogfish / spurdog
dolly varden
dottyback
dragonfish
eel
electric eel "they aren't true eels, but a type of **knifefish**"
filefish
flatfish
flathead
flounder
flying fish "they glide along the water's surface, giving the illusion of flight"
footballfish
frogfish
frontosa
gar / garfish
garabaldi / garibaldi
glassfish
goatfish
goby
goldfish "these **carp** were selectively bred to be kept as pets"
koi / nishikigoi "these **carp** were selectively bred for their color"
ranchū
goodeid
gourami
gramma
grayling
grunt
gudgeon
guitarfish
guppy
gurnard
haddock
hagfish
hake
halibut
hammerhead / hammerhead shark "while called **hammers**, their heads are actually for a wider field of vision"
helicoprion "this shark-like creature possessed an odd mouth, look it up"
handfish
hatchetfish
hawkfish
herring
hogsucker
humuhumunukunukuapua'a
icefish
ide
jawfish
killifish
kingfish
knifefish
ladyfish
lamprey "this jawless fish latches onto prey and sucks their blood!"
lanternfish / lantern
mahi-mahi / dorado / dolphinfish
lingcod
lionfish
loach
lungfish
mackerel
madtom
mako
mandarinfish
marlin / skilligalee
billfish / sailfish
megalodon "wow, that's big..."
menhaden
minnow
molly
monkfish
moray
mudskipper
mullet
muskullunge / muskie / musky
napoleonfish
needlefish
oarfish
oilfish
opah / moonfish / redfin / ocean pan
opaleye
oscar
pacu
paddlefish
panfish / pumpkinseed
wolffish / seawolf
parrotfish
payara
pellonuline
pencilfish
perch
permit
pickerel
pigfish
pike
pikeminnow
pilotfish
pinfish
pipefish
piranha
placoderm
pleco
plichard
pollock
pompano
porgy
pupfish
rainbowfish
rasbora
rattail / grenadier
ray / stingray / manta ray / manta
redfish
remora / suckerfish / sharksucker
rockfish
roughy
salmon / coho / sockeye
sardine
sauger
saury
sawfish
scad
sculpin
seahorse
searobin
shark
sheepshead
shiner
silverside
skate
smelt
snakehead
snapper
snook
soapfish
sole
spadefish
spiderfish
sprat
squirrelfish
stickleback
stonefish
stringfish
sturgeon
sucker
sunfish / mola mola
sweetfish
swordfish / broadbill
swordtail / platyfish / platy
taimen
tang / surgeonfish
tarpon
tetra
thryssa
tiktaalik
tilapia
tilefish
toadfish
toothfish
trevalley
triggerfish
tripletail
tripodfish
trout
tuna / bluefin
albacore / longfin
tench / doctor fish
cookiecutter / cigar shark
fallfish
butterfish
queenfish
splake
tunny
turbot
turkeyfish
unicornfish
viperfish
wahoo
walleye
whitefish
whiting
wobbegong "didn't think that was real, huh?"
wrasse
xiphactinus
yellowfin
zander
zebrafish
zope

[bugs]
= creepy crawly / creepy crawler
& insects
& arachnids
centipede
millipede
arthropleura
earthworm / worm / nightcrawler "they can regenerate when cut in half"

[insects]
admiral
alderfly
angel insect / ground louse / zorapteran / zoraptera
ant "there are probably like 20 quadrillion ants on earth"
antlion
aphid
barklouse / booklouse
bedbug "don't let them bite"
bee / honeybee / bumblebee "bees have 5 eyes (including 3 very simple ones)"
beefly
beewolf
blackfly
plant louse / psyllid
longhorn
owlfly
robber fly / assassin fly
leaf miner
firebrat
beetle "beetles make up 40% of all arthropod species"
boxelder / box bug
blowfly / greenbottle / bluebottle / carrion fly
bookworm
botfly / warble fly / heel fly / gadfly
bristletail / archaeognaths
butterfly "butterflies will drink blood when given the option"
caddisfly
meganeura
caterpillar
cicada
cockroach / roach
crane fly
cricket
wētā
swallowtail
damselfly
dobsonfly
dragonfly
dung beetle
earwig "contrary to popular belief, earwigs do not go in your ears"
earwigfly / forcepfly
firefly / lightning bug "not all of these funky beetles have lanterns"
flea
fly
fruit fly
gladiator / rock crawler / heelwalker / mantophasmid / manto
griffinfly
glowworm
gnat / nat
grasshopper
hornet "SHAW!"
horsefly / deer fly
housefly
hoverfly
inchworm
june beetle / june bug
katydid
lacewing / mantisfly / mantidfly / mantispid
ladybug / lady beetle / ladybird
leafhopper / hopper
lepidoptera / lepidopteran
locust
louse / biting louse
maggot / grub
mantis / mantid
mayfly
mealworm
mealybug
midge
monarch
mosquito / skeeter "this is the deadliest animal in the world, if you count diseases"
moth
palmetto bug / woods cockroach
planthopper
ringlet
sandfly
sawfly
scarab
scorpionfly
shieldbug
silkworm
silverfish / fishmoth
froghopper / spittlebug
whitefly
snakefly
springtail
stick bug / stick insect / leaf insect / walking stick "get stick bugged LOL"
stink bug
stonefly
termite
thrip
treehopper
trig
wasp
water strider / waterskipper / pond-skater
webspinner
weevil
wood nypmh
yellow jacket

[arachnids]
spider "a spider's legs are extended by pumping fluid, similar to hydraulics"
mite
scorpion
tarantula
tick
pseudoscorpion
harvestman / harvestmen
camel spider
whip spider
redback
vinegaroon
wolf spider
widow
daddy long-legs / cellar spider / carpenter spider / long daddy
black widow
house spider
huntsman / huntsman spider
orb-weaver / orbweaver
clover mite
ricinulei
uropygid / whip scorpion
recluse

[crustaceans]
= decapod
crab
hermit crab / hermit
barnacle
crayfish / crawfish / crawdad
krill
lobster / lobber
shrimp / prawn / shimp "the **peacock mantis shrimp**'s punch is so strong that it boils the water around it"
isopod
pill bug / rolly polly / rolly poly / roly poly / slater / potato bug / curly bug / doodle bug / sowbug / woodlouse
brine shrimp / sea monkey
branchiopod / fairy shrimp / water flea / daphnia
remipede
copepod
ostracod
amphipod
sandhopper / sand flea
triops / tadpole shrimp "this species is extremely old, giving it the nickname 'living fossil'"
nauplius
spider crab

[mollusks]
= mollusc
& cephalopods
clam / clamshell / bivalve
snail / gastropod "they really like cucumbers"
slug
limpet
scallop
mussel
wentletrap
oyster
cockle
geoduck
quahog
abalone
piddock
shipworm
murex
periwinkle / winkle
nudibranch / sea bunny
sea hare
cowrie / cowry
whelk
volute
chiton
conch "the shell has spoken!"
pipi

[cephalopods]
= inkfish
nautilus
octopus "octopi have a mini brain in each of their legs"
squid
cuttlefish / cuttle / sepiida
ammonite / amonite
belemnite
vampyromorph / vampire squid
wheketere / arrow squid
humboldt squid
colossal squid
giant squid
bigfin squid / magnapinna
orthocerida

[hybrid animals]
= hybrid / crossbreed / crossbred
leopon
kunga
mule / hinny / hinnie
tigon / tiglon
dzo
yakalo
liger / ligre
zonkey / zedonk / zeedonk
zorse / zebroid
sturddlefish
liliger
narluga
wholphin
humanzee
lipard
chimera
liguar
lijagupard
litigon
geep
wolfdog
tiguar
pizzly / pizzly bear / grolar / grolar bear / zebra bear
pumapard
coywolf
beefalo
jackalope "that's not even real"
meowl "i guess i'll allow it"
cabbit "i guess i'll allow it"
cama "a **llama** crossed with a **camel**"
chausie
huarizo
llapaca
mangalica
mulard
rackelhahn / rackelwild
zony
zubron
coydog

[ancient animals]
= extinct
& dinosaurs
ammonite
anomalocaris
arandaspis
caveman
kumimanu
dire wolf
perplexicervix
dodo
mesohippus
helicoprion
kelenken / terror bird
orthocerida
tsidiiyazhi
griffinfly
mihirung
longmornis
homo luzonensis / callao man / ubag
cyrilavis
eohippus
dunkleosteus
denisovan
homo antecessor
homo naledi
megaloceros
homo rudolfensis
haikouichthys
meganeura
elasmotherium
moa
sacabambaspis
arthropleura
basilosaurus
aurochs
bluebuck / bloubok
belemnite
pakicetus
platybelodon
hallucigenia
gigantopithecus
homo heidelbergensis
ardipithecus
sahelanthropus
australopithecus
homo habilis
neanderthal / neanderthalensis
homo ergaster
homo erectus
mammoth
mastodon
hyracotherium
megalodon
opabinia
sarotrocercus
thylacine / tasmanian tiger / tasmanian wolf
tiktaalik
titanoboa
trilobite
xiphactinus

[mythical creatures]
= creatures / fantasy creatures / fictional creatures / beings / legendary creatures / mythological creatures
angel
archangel
aqrabuamelu
bloody mary
ba jiao gui
baba yaga
valkyrie
el gran maja / the great maja
hobgoblin
naga
cait sith / cat-sìth
mutant
bunyip
cherub
boojum
mimic
ophanim
lyngbakr
roc
krampus
erinyes / eumenides / furies / dirae
pocong
bonnacon
kitsune
krasue
nypmh / nymphe
sleipnir
homunculus
wolpertinger / wolperdinger / woiperdinger
slime / ooze
headless horseman
beast
babi ngepet
skinwalker
ouroboros / uroboros
alien
martian
squonk
fresno nightcrawler
creeper
skeleton
catperson / catboy / catgirl
wraith
puppyboy / puppygirl
lich
fursona
king kong / kong
badalisc
bahamut
bak
banshee
snallygaster
monster
basilisk
behemoth
blemmyae
bogeyman / boogeyman
catdog
centaur
cerberus
shapeshifter / changeling
chimera
chupacabra
cockatrice
cthulhu
cyborg
cyclops
demon / devil / imp
dragon
draugr
dwarf
dybbuk
elemental
elf
ent
fairy / faery / fey / fae
faun / goat man
fenrir
frankenstein
gargoyle
genie / jinn / djinn
ghost / ghoul / specter / spectre / phantom / spirit / ghostly / ghast
púca / puca / pwca / pooka / pookah / phouka / puck
giant / giantess
gilgamesh
gnome
goblin
kaiju / godzilla
golem
gorgon / medusa
gremlin
griffin / griffon / gryphon
opinicus
grim reaper
halfling
yōkai / youkai
naiad / hydriad
strzyga / stryga
harpy
hippogriff / hippogryph
poltergeist
mothman
hydra
kobold
kraken / kracken
kuchisake-onna
leprechaun
leviathan / sea monster
loch ness / nessie
manticore
mermaid / merman / merwoman
kumiho
jiuweihu / fox spirit
qilin / kirin
bicorn
hellhound
minotaur
mrs claus / miss claus / ms claus
mummy
nymph
ogre
oni
orc / ork
phoenix
pixie
pontianak
qu
santa / santa claus
sasquatch / bigfoot
satyr
sea serpent / serpent / jörmungandr
selkie
siren
sphinx
sprite / seelie / seely / sidhe / sylph
tsuchinoko
unicorn / pegasus / alicorn
vampire / dracula
wendigo
werepig / suscrofathrope
therianthrope
werewolf / lycanthrope
wisp
wyrm
wyvern
yeti / abominable snowman
yowie
zombie / walker

[natural objects]
& stones
& landforms
air
algae / alga / algal "this isn't a plant or fungus, but its own thing"
blood
bone
bubble
bulb
charcoal
clay
mollisol
coal
shell / seashell
silt
den
sediment
deoxyribonucleic acid / dna
diarrhea / diarrhoea
dirt / earth / soil
dust
egg
fire
foam
gum
hive / beehive / bee nest
ice
kelp
lava
leaf
magma
mud
nest
pee / urine / piss / peepee
peel
pinecone / cone
poop / poo / poopy / crap / shit / dookie / poopie / doodoo / guano / feces / faeces / turd / shart / manure / muck "very mature.."
ribonucleic acid / rna
roe / caviar
root
rust / rusty
sand "you could make a game out of this.."
mycelium
pollen
raindrop
sap
seaweed
slime / goo / ooze / goop
snow / snowflake / snowball
stick / twig / branch "one of the many things that can break bones"
blossom
bud
petal
pistil
stem
boll
stump
vomit / puke / throwup / barf
bile
mucus / mucous / phlegm
snot / booger
earwax
dandruff
log
cocoon
icicle
permafrost
water "is it wet? who can say.."
wax / beeswax
web / cobweb
latex
chicle

[stones]
= rock
& gemstones
actinolite
adakite
adamellite
agpaitic
alabaster
albite
alunite
amphibolite
andesite
anhydrite
ankaramite / ankarmite
anorthosite
anthracite
aphanite
aplite
appinite
aragonite
argillite
arkose
ashlar
augite
basalt / basaltic
basanite
bauxite
bedrock
benmoreite
bentonite
bismuthinite
blairmorite
blueschist
boninite
borolanite
boulder
breccia
brimstone
calcarenite
calcflinta
calciche
carbonatite
cassiterite
cataclasite
chalk
charnockite
chert
chromite
claystone
coal
cobaltite
cobble / cobblestone
comendite
conglomerate
coquina
cryolite
cummingtonite
curite
dacite
diabase / dolerite
diamictite
diatomite
diorite "what's this?"
dolomite / dolostone
dunite
eclogite
enderbite
epidosite
epidote
erythrite
essexite
evaporite
felsite
flint
foidolite
fossil
fulgurite
gabbro
ganister
geode
geyserite
glimmerite
gneiss
gossan
granite
granodiorite
granophyre
granulite
graphite
graywacke / greywacke
greenschist
gritstone
gypsum
harzburgite
hawaiite
hornblendite / hornblende
hornfels
hyaloclastite
icelandite
igneous
ignimbrite
ijolite
illite
ilmenite
ironstone
itacolumite
jadeitite
jasperoid
jaspillite
kenyte
kimberlite
komatiite
lamproite
lamprophyre
larvikite
laterite
latite
leucitite
lherzolite
lignite
limestone
limonite
listwanite
litchfieldite
llanite
luxullianite
magnetite
mangerite
marble
mariposite
marl
metamorphic
metapelite
metapsammite
mica
microcline
migmatite / miagmite
minette
monzodiorite
monzogabbro
monzogranite
monzonite / monzodridite
mudstone
mugearite
mylonite
napoleonite / corsite
nepheline / nephelite
nephelinite
norite
novaculite
obsidian
oolite
ore
pantellerite
pebble
pegmatite
periclase
peridotite
petrified wood
phonolite
phonotephrite
phosphorite
phyllite
picrite
pietersite
pitchblende
porphyry
pseudotachylite
puddingstone / plum-pudding stone
pumice
pyrolite
pyrolusite
pyroxenite
quartzite
quartzolite
rhyodacite
rhyolite
rodingite
rutile
sandstone
satin spar
schist
scoria
sedimentary
semipelite
serpentinite / serpintinite
shale
shonkinite
shoshonite
shungite
silica
siltstone
skarn
slate
soapstone
sovite
stalactite
stalagmite
stibnite
suevite
syenite
syenogranite
sylvinite
sylvite
tachylite
tachylyte
taconite
talc
tectonite
tephriphonolite
tephrite
teschenite
theralite
tillite
tonalite
trachyandesite
trachybasalt
trachyte
travertine
trinitie
troctolite
trondhjemite
tufa
tuff
turbidite
unakite
variolite
vitrophyre
vogesite
volcanic
wackestone
wad
websterite
wehrlite
whiteschist

[gemstones]
= crystal / gem / jewel
achroite
agate
alexandrite
amazonite
amber
amethyst
ametrine
bayldonite
ammolite / ammonite
anatase
andalusite
andesine
andradite / demantoid
apatite
aquamarine
aventurine
axinite
azurite
barite
bastnaesite
benitoite
beryl
bixbite
bloodstone / ematille / heliotrope
calcite
californite
carnelian
celestine / celestite
chalcedony
chalybite
charoite
chrysoberyl
chrysocolla
chrysoprase
citrine
clinohumite
copal
coral
cordierite
corundum
cyprine
danburite
datolite
diamond / moissanite / zirconia
diaspore
diopside
dioptase
dravite
ekanite
emerald
enstatite
feldspar
fluorite
forsterite
garnet
goldstone
goshenite
greenovite
hackmanite
hauyne
heliodor
hematite / haematite
hiddenite
idocrase
iolite
ivory
jade
jadeite
jasper
jet
kornerupine
kunzite
kwaythuite
kyanite / disthene / cyanite
kyawthuite
labradorite
lapis lazuli / lapis / lazuli
larimar
lazurite
lepidolite
malachite
maxixe / blue beryl
monazite
moonstone
morganite
nephrite
olivine
onyx
opal / opalite
pearl
pectolite
peridot
phenakite
poudretteite
prasolite / vermarine / green amethyst / green quartz
pyrite
chalcopyrite
quartz
rhodochrosite
rhodonite
rubellite
ruby
sapphire
sard / sardonyx
scapolite
selenite
septarian
serpentine / bowenite
siderite
sodalite
spectrolite
spessartite
sphalerite
spinel
spodumene
sunstone
tanzanite
tashmarine
thulite
tiger's eye / tiger eye / tigereye
titanite / sphene
topaz
tourmaline
triphane
tsavorite
turquoise
uvarovite
vesuvianite
willemite
zincite
zircon
zoisite
zultanite
hessonite
howlite
angelite
yooperlite

[plants]
= flora / brush / greenery
& flowers
& fruits
& vegetables
& nuts
& trees
seed
seedling / sapling / sprout
spore
bush / shrub
coca
agave
yucca
flax
boxelder
cotton
sugarcane / cane
peyote
moss
alexanders / alisander
bluecurls
reed
wheatgrass
flytrap
pitcher plant
hedge
xanthium / cocklebur
liverwort
duckweed
legume
grass "touch this instead of typing words all day"
cereal / grain
wheat
tumbleweed
mistletoe
thistle
oats
hay / crop
barley
lilypad / water lily
sorghum
rice
millet
rye
quinoa
buckwheat
bamboo "did you know bamboo is a type of grass?"
vine
weeds
marijuana / cannabis / weed / kush / ganja / za / pot
tobacco / grabba
fern
azolla
bindweed
ivy
citronella
clover
rapeseed
wormwood
poison oak
cress
bittercress / popping cress / wood-cress / pepperweed / shotweed / snapweed
alder
aloe vera / aloe
cactus / succulent
broomrape / orobanche
mudweed
catnip
cattail
sundew
monstera
clubmoss / lycopsid / lycopod / lycophyte
horsetail
cycad
kudzu
ashwagandha
turf / sod
myrtle
crabgrass / finger-grass
saguaro
bladderwort
butterwort
waterwheel

[flowers]
"awww, you got this for me?"
abutilon
aconite
agapanthus
ageratum
ramsons / cheremsha / tjeremsha / cowleek / buckrams
alchemilla
allium
st. john's-wort
alstroemeria
vanilla
trollius
mallow
fireweed
nightshade
marshmallow
uva ursi / barberry
murraya
wisteria
halesia / silverbell / snowdrop
asphodel
bouganvillea
thrift / sea thrift / sea pink / armeria maritima
patchouli
witchweed
paulownia
leopard's-bane
rafflesia / corpse lily
titan arum / corpse flower / corpse plant "this flower blooms for a very short time and smells like rotting flesh"
alstromeria
alyssum
amaranth / amaranthus
amaryllis
anemone
anthurium / laceleaf
arfaj
arrowwood
aster
astilbe
azalea
baby's breath
ballota
baptisia
bee balm
begonia
belladonna
bellflower
bells of ireland
bergamot
bergenia
billbergia
bird of paradise / strelitzia
flower-of-an-hour / bladder hibiscus / bladder ketmia / bladder weed / puarangi / venice mallow
black-eyed susan
bleeding heart
bletilla
blue-eyed grass
bluebell
bluebonnet
bluet
bottlebrush
bouvardia
brachyscome
brassica
brunia
bugle / bugleweed
butterbur
buttercup
butterfly / butterfly weed
calceolaria
calendula
calla / calla lily
camellia
campanula
campion
candytuft
canterbury bells
cardinal flower / cardinal
carnation
catharanthus
catmint
celosia
cerastium tomentosum
chamomile
chionodoxa
chrysanthemum
cinquefoil
clarkia
clematis
cleome
coltsfoot
columbine
coneflower
coral bells
coreopsis
corn-cockle
cornflower
corydalis
cosmos
cotoneaster
craspedia
crocosmia
crocus
cyclamen
daffodil / narcissus
dahlia
daisy
dandelion
daphne
datura
daylily
decumaria
delphinium
deutzia
dianella
dianthus
diascia
dietes
disa
dusty miller
dutchman's breeches
echinops
echium
epimedium
eremurus
erica
erigeron
eryngium
euphorbia
eustoma
feverfew
firethorn
forget-me-not
forsythia / forsynthia
foxglove
freesia
fuchsia
gaillardia
gardenia
gazania
geranium
gladiolus / gladiolas
goldenrod
gomphrena
guzmania
gypsophila
heather
hebe
helenium
helichrysum
hellebore
hemlock
hibiscus
holly
hollyhock
honesty
honeysuckle
hosta
hyacinth
hydrangea
hypericum
impatiens
iris
ixia
ixora
jacob's ladder
jalap
jasmine
kale
kalmia
knautia
kniphofia
laelia
lantana
larkspur
lavatera
lavender
lewesia
liatris
lilac
lily
lily of the valley
linaria
lisianthus
lotus
lunaria
lupin
lupine
mandevilla
marigold
matthiola
mayflower
meconopsis
milkweed
monk's hood
moraea
morning glory
mullein
nasturtium
nemesia
nemophila
neoregelia
nerine
nicotiana
nierembergia
nigella
nolana
oleander
olearia
orchid
ornithogalum
osteospermum
oxalis
paintbrush / painted cups / prairie-fire
pansy
parodia
pelargonium
penstemon
peony
periwinkle
petunia
pheasant's eye
phlox
photinia
physostegia
pimpernel
pincushion flower / pincushion
pink
plumeria
poinsettia / poinsetta
polyanthus
poppy
potentilla
powder puff
primrose
queen anne's lace
ragweed / ambrosia / bursage / burrobrush
ranunculus
rhododendron
rondeletia
rose / rosebud
saffron
sage
salvia
scabiosa
scaevola
scilla
sea holly
sedum
silene
snapdragon
soapwort
speedwell
squill
starflower
statice
stock
strawflower
sunflower
sweet pea
sweet william
teasel
tinker bell
tithonia
trachelium
trillium
triteleia
tritonia crocata
tuberose
tulip
ursinia
valerian
verbascum
verbenas
veronica
violet
wallflower
wandflower
watsonia
wedelia
weigela
wildflower
winterberry
xerophyllum
xylobium
xylosma
yarrow
zenobia
zinnia

[fruits]
berry
drupe
abiu
açaí
acerola
akebi
ackee
apple
apricot
pluot / aprium / apriplum / plumcot / plumpicot / pluclot
lucuma
wax gourd / ash gourd / winter melon
bilimbi
sultana
cashew "did you know that cashews come from a fruit?"
aratiles
araza
avocado
lingonberry
bearberry
banana "we share about 60% of our genes"
bilberry
blackberry
blackcurrant
black sapote
blueberry
boysenberry
breadfruit
buddha's hand
cactus pear
canistel / egg fruit
catmon
cempedak
cherimoya / custard apple
cherry
chico fruit / chico
citron
cloudberry
coco de mer
coconut
crab apple
cranberry / craisin
currant
damson
date
dragonfruit / pitaya
durian
elderberry
feijoa
fig
gac
goji
gooseberry
grape / raisin "grapes are the perfect fruit to practice surgery on"
grapefruit
guava
guarana
hala
haw / hawthorn
honeyberry
huckleberry
jabuticaba / plinia
jackfruit / jakfruit / nangka
jambul
japanese plum
jostaberry
peppercorn
jujube
juniper
kaffir lime
kiwano / horned melon
kiwifruit / kiwi
kumquat / cumquat
lanzones / langsat
lemon "easy peasy!"
lime
loganberry
longan
loquat
lulo
lychee
barberry
macopa / wax apple
mamey
mango
mangosteen
marionberry
medlar
melon
cantaloupe / rockmelon
galia melon / galia / sarda
honeydew
mouse melon
muskmelon
watermelon "japanese farmers have grown watermelons into cube shapes for easier stacking"
monkfruit
miracle fruit
mohsina
momordica
mulberry
nance
nectarine
orange
blood orange
mandarin / mandarin orange / mandarine
clementine / cutie
tangerine
papaya
passionfruit
pawpaw
peach
pear
persimmon
pineapple / abacaxi
pineberry
plantain
plum / prune
pomegranate
pomelo
quince
raspberry
salmonberry
rambutan
redcurrant
rose apple
salal berry
salak
santol
sapodilla
sapote
sarguelas
saskatoon berry / saskatoon serviceberry / serviceberry / saskatoon
satsuma
sloe
soursop / guyabano / graviola / guanábana
star apple
carambola / star fruit
strawberry "how many R's are in this?"
dewberry
sugar apple
suriname cherry
tamarillo
tamarind
tangelo
tayberry
thimbleberry
ugli fruit
white currant
white sapote
ximenia
yuzu

azuki bean / azuki / adzuki
pepper / chili / capsicum
bean
cucumber
eggplant / aubergine
jalapeño
habanero
carolina reaper
olive
pea / peapod
pumpkin
gourd
squash
tomato
courgette / zucchini

[vegetables]
= veggies / veggie
"remember to eat your greens!"
azuki bean / azuki / adzuki
pepper / chili / capsicum
bean
cucumber
eggplant / aubergine
jalapeño
habanero
carolina reaper
ginseng
olive
pea / peapod
lotus root
pumpkin
watercress
gourd
squash
tomato
courgette / zucchini
corn / maize
root

acorn squash
alfalfa sprouts / alfalfa
artichoke
arugula / rocket
asparagus
banana squash
bean sprout
beet greens
beetroot / beet
bitter melon
black bean
black-eyed pea
bok choy
broad bean
broccoflower
broccoli
broccolini
romanesco
brussels sprouts / brussel sprout / brussels
butter bean
butternut squash
cabbage
carrot
cassava / manioc / yuca
cauliflower
cayenne pepper / cayenne
celeriac
celery
chard
chickpea / garbanzo / ceci / ceci bean
chicory
chives
cilantro
collard greens
coriander
corm
cranberry bean / borlotti bean / roman bean
daikon / white radish
delicata
eddoe
endive
fennel
fiddlehead
frisee
garlic
gem squash
ginger
green bean
greens
horseradish
hubbard squash
jicama
kale
kidney bean
kohlrabi
konjac
kumara
leek
lentil
lettuce
lima bean / lima
mange tout / snap pea
mangelwurzel
marrow
mung bean / mung
mushroom "while technically not a plant, most cooks consider them to be vegetables"
mustard greens
navy bean
nettle
oca
okra
onion
onion sprout
paprika
parsnip
pinto bean / pinto
potato / spud
radicchio
radish
red cabbage
rhubarb
runner bean
rutabaga / swede
salsify / oyster plant
savoy cabbage
scallion / spring onion / green onion
shallot
skirret
sour cabbage
sour yam
soybean / soy / soya
edamame
spaghetti squash
spinach
split pea
succotash
sweet potato
sweet yam
sweetcorn
tabasco pepper / tabasco
taro
tat soi
tomatillo
topinambur
tubers
turnip
wasabi
water chestnut
yam
ube

[fungi]
= fungus
mushroom
shiitake
mold / mould
lichen "lichens are actually part-**algae** and part-fungus"
cordyceps "this parasitic fungus takes over the brain of ants, turning them into zombies"
amanita
enoki
mildew
common / white / button / champignon
brown / cremini / crimini / chestnut / baby bella
portobello / portabella / portobella
wood ear
oyster
beech
maitake / hen of the woods
chicken of the woods
toadstool
king trumpet
chanterelle
morel
porcini / porcino / cep / penny bun
destroying angel
death cap
jack o'lantern
panther cap
false morel
honey
truffle
matsutake
pig's ears / pig ears / violet chanterelle
cauliflower
fairy-ring
lobster
coral
amethyst deceiver
sweet tooth / pig's trotter / wood hedgehog / hedgehog
inky cap / ink cap / tippler's bane
orange peel
fly agaric / fly amanita
milk cap
skullcap
webcap
yellowfoot
conecap
conocybe
psilocybe / psilocybin
wine-cap / stropharia / roundhead
blewit
shaggy mane / shaggy ink cap / lawyer's wig / shaggy
fibrecap
funnel
sulphur tuft / sulfur tuft / woodlover
yellow-staining / yellow-stainer
puffball "the giant puffball grows much bigger than your head"
lion's mane
bleeding tooth
devil's fingers / octopus stinkhorn
bamboo
ghost
brittlegill / russula
parasol
grisette
st george's
oysterling
helvella / vinegar cup
blistered cup
bolete
horse
earthball
earthstar
horn of plenty / black chanterelle / black trumpet / trumpet of the dead
caesar's
plums and custard / red-haired
slippery jack / sticky bun
charbonnier / sooty head / streaked tricholoma
deer
the sickener / emetic russula / vomiting russula
pinkgill
blusher
wrinkled cort
shrooms

[seasonings]
= spices / herbs / flavorings / flavourings / garnish
allspice
angelica
stevia
anise
asafoetida
basil
zest
bay leaf
bergamot
cajun
borage
burnet
caraway
cardamom
miso
cassia
cayenne
celery seed
chervil
chicory
chives
cicely
cilantro
sugar
cinnamon
clove
coriander
costmary
cumin
curry
dill
fennel
fenugreek
filé / file
garlic / garlic powder
ginger
horehound
horseradish
hyssop
lavender
lemon balm
lemon grass
licorice / liquorice
lovage
mace
marjoram
mustard
nutmeg
onion / onion powder
oregano
paprika
parsley
pepper / black pepper / peppercorn
peppermint
poppy / poppyseed
rosemary
rue
saffron
sage
salt
savory
sesame
sorrel
spearmint / mint
star anise
tarragon
thyme
turmeric
vanilla
verbena
wasabi
msg
old bay

[nuts]
"nuts, and similar.."
acorn
almond "not actually a nut, but part of the **peach** family"
beech
bopple / red nut
brazil nut / brazil
breadnut
candlenut / kukui nut / kukui
cashew
chestnut
pili
chufa
coconut
deeknut
hazelnut / hazel
inchi / sacha
karuka
kola
kurrajong
macadamia
mongongo
palm nut / palm
peanut
pecan
pine nut / pine
pistachio
soybean / soy / soya
edamame
walnut
fox nut / gorgon nut / euryale ferox

[trees]
tamarack / hackmatack
jarrah
sandalwood
madrone / madrona / arbutus / strawberry
douglas
mesquite
ironwood
rosewood
bristlecone
kauri
wisteria
narra / asana / angsana
boojum / cirio
acacia / wattle
applewood / apple
alder
arborvitae / thuja
ash
rowan
kukui / candlenut
ailanthus / tree of heaven
aspen
azalea
plane
basswood
brazilwood
beech
birch
bonsai
yew
boxwood / box
butternut
catalpa
cedar
chestnut
christmas
conifer
cacao / cocoa
cottonwood
cucumber "yes, there's a **tree** called that too"
cypress
sycamore
deciduous
dogwood
elder
elm
balsa
mahogany
banyan
blackwood
bloodwood
bocote
bubinga
canarywood
ebony
greenheart
ipê / poui / pau d'arco / epay / lapacho / guayacan
koa
jatobá
macassar
mopane
poisonwood
purpleheart
rubber
wenge
zebrawood / zebrano
pink ivory / red ivory / purple ivory / unnini / umgoloti
evergreen
baobab
laurel
camphor
dragon's blood
ceiba / kapok
manchineel
mangrove
monkey puzzle
olive
rainbow eucalyptus
sandbox
snakewood
strangler fig
fir
ginkgo / biloba
hawthorn
hemlock
hickory
hophornbeam
eucalyptus
hornbeam
juniper
larch
linden
locust
magnolia
maple
sumac
teak
mountain-ash
oak
palm "palm trees technically aren't **tree**s but i'll let it slide"
pando "pando is a massive single organism made up of thousands of **tree**s"
pine
poplar
redbud
redcedar
redwood / sequoia "the tallest **tree**, a ^, in the world is over 380 feet tall"
sakura / cherry blossom / cherry
sassafras
shadbush
spruce
sweetgum
tupelo
viburnum
willow
zelkova

[meats]
bacon
beef / steak
blutwurst / blood sausage
bockwurst
escargot
bologna / baloney
pancetta
fillet
deli
gammon
chitlin
cutlet
flank
jowl
unagi
lox
carnitas
sashimi
lengua
bratwurst
braunschweiger
breast
tripe
spam
fugu / bogeo / bok / hétún
brisket
canadian bacon
ribeye
t-bone
burger / hamburger / cheeseburger / chezburger / patty
calamari
cervelat
chicken / poultry
nugget / chicken nugget
chorizo
drumstick
duck
prosciutto
sinew
gabagool
capicola / capocollo
fish
foie gras
frog leg
gizzards
ham
kidney
kielbasa
lamb
liver
meatball
mortadella
mutton
pastrami
pâté
pepperoni
pork / porkchop
chop
ribs
salami
salmon
sausage / frankfurter / frank / hotdog / glizzy / weiner
scampi
scrapple
seafood / shellfish
shad / alewife
sirloin
tenderloin
tuna
turkey
veal
venison
wagyu

[food]
= foods
& fruits
& vegetables
& nuts
& meats
& condiments
& pasta shapes
& seasonings
adobo
afghan
anpan
appetizer
applesauce
bacon
bagel
baguette
banh mi
barley
batter
bibimbap
big mac
biltong
birria
biryani
biscuit
blini
bonbon / cinnabon
borscht
bread / bun / loaf / roll
breadstick
breakfast
brie
brine
broth
brownie
brunch
bruschetta
buckwheat
burrito
butterscotch
cake
calzone
candy / sweet
cannoli
carbonara
casserole
cereal
cornflake
ceviche
cheerios
cheese
cheesecake
cheeto
shabu-shabu
chia
chicle
chimichanga
chips / crisps
chocolate
chop suey
choux
chow mein
cobbler
cookie
corndog
couscous
cracker
cream puff / profiterole
creamsicle
crepe
croissant
crumb
crumpet
crust
cupcake
curry
custard
dalgona / ppopgi
danish
dessert
dim sum
dinner
dorito
dough
doughnut / donut
dumpling
éclair
egg / yolk
egg roll
elevenses
empanada
enchilada
entremet
fajita
falafel
flan
flour
fries "put the words in the bag lil bro"
frito
frittata
fritter
froyo / frozen yogurt
garam masala
gelatin / jell-o
gelato
gimbap
gingerbread
gochujang
goldfish
granola
guacamole / guac
gum / bubblegum "selling chewing gum is illegal in Singapore"
gumball
gumdrop
gummy
gyro / wrap
hashbrown
hershey
kitkat
twix
feijoada
agar / agar-agar
hotpot
xanthan
hummus
hydrox
ice cream
jeon
jerky
kaldereta / caldereta
kebab / kabob / kebap
kimchi
lays
lo mein
lollipop / lollypop / lolly
lumpiang
lunch
m&&m
macaron
macaroon
mandu
marshmallow "they are named after the flower originally used to make them"
meal / cuisine / dish / ration
meatloaf
meringue
millet
mirin
mochi
monte carlo
mooncake
mousse
muffin
mulligatawny
naan
nacho
nasi goreng
noodle
nougat
oatmeal
oats
oka i'a / oka
okchun-dang / okchun
omelette / omelet
omurice
onigiri
nigiri
onion ring
oreo
pad thai
paella
pancake / flapjack
panettone
panini
panna cotta
pasta
pastry
pavlova
pectin
pho
pickle
pie
pizza / za
popcorn
popsicle
poptart
porridge / gruel
pretzel
pringle
pudding
pumpkin seed
quesabirria
quesadilla
quiche
quinoa
ramen
ramyeon
ratatouille
reese's puffs
rice
risotto
rye
s'more
salad
saltine
samosa
sandwich
sub / hoagie
schneeball
scone
seaweed / gim
shawarma / shwarma
sherbet
shortbread
shortcake
sisig
skittle
smetana
snack / treat
parfait
baklava
pb&j / peanut butter and jelly / peanut butter jelly
churro / fried dough
snicker
snowcone / sno cone
sorbet
sorghum
soufflé
soup
souvlaki
spongecake / tres leches
spring roll
congee
hushpuppy
jellybean
stuffing
grits
gratin
dango
taiyaki
takoyaki
tempura
chowder
crinkle
pocky
stew
stromboli
stroopwafel
strudel
sundae / banana split
supper
sushi
taco
taffy / yeot
toffee
tamale
tanghulu
tapioca
taquito
tart
tater tot / tots
tiramisu
toast
tofu
tortilla / pita / roti / laffa / flatbread
trail mix
tteokbokki
wafer
waffle
wheat
whopper
wonton
xiaolongbao / soup dumpling
yeast
yogurt / yoghurt / yogourt / yoghourt
yugwa

[pasta shapes]
acini di pepe
anelli
angel hair / capellini
bigoli
bucatini
campanelle
casarecce
cavatappi
cavatelli
conchiglie / shells
udon
ditalini
egg noodles
farfalle
fettuccini / fettuccine
fregola
fusilli
gemelli
gnocchi
lasagna / lasagne
linguine
macaroni
mafaldine
manicotti / cannelloni
orecchiette
orzo
paccheri
pappardelle
penne
radiatori
ravioli
rigatoni
rotelle / ruote / wheels
rotini
spaghetti / spaghettini / spaghettoni
stelline
tagliatelle
tortellini
trofie
vermicelli
ziti / zitoni

[cheeses]
american
asiago
pecorino
whey
blue / bleu
bocconcini
babybel
chanakh
mish
rumi
domiati
wagasi
halloumi / haloumi
nøkkelost
brunost
norvegia
chechil
motal
tel panir / husats panir
horats panir / yeghegnadzor
brie
burrata
camembert
cheddar "this cheese comes from a village in England called Cheddar"
chevre / goat
colby
cotija
cottage
cream
curds
edam
emmental / emmentaler
stilton
raclette
fontina
butterkase
farmer's
feta
gorgonzola
gouda
gruyere
havarti
jack / monterey
jarlsberg
limburger
mascarpone
mozzarella / mozz
muenster
neufchatel
paneer
parmesan
provolone
queso
ricotta
romano
roquefort
string
swiss

[condiments]
aioli
alfredo
barbecue / bbq / barbeque
bolognese
butter
caramel
chimichurri
coleslaw
nonpareils / hundreds and thousands
marmite
dip
dressing
sauerkraut
fondue
gravy / grease
honey
hot sauce / sriracha
icing / frosting / buttercream / fondant
jam
jelly
ketchup
margarine
marinade
marinara
marmalade
mayochup
mayonnaise / mayo
miracle whip
mustard
nutella
oil
peanut butter
preserve
ranch
relish
sauce
soy / soy sauce / soya / soya sauce / teriyaki
sprinkles
syrup
vinegar
whipped cream / cool whip
worcestershire

[drinks]
= beverages / liquids
7up
absinthe
affogato
agua fresca
alani
alcohol
alcopop
ale
almond water
americano
anisette
apéritif / ouzo
aperol
arnold palmer
ayran
beer
bellini
bloody mary
boba / bubble tea
bourbon
brandy
buttermilk
caipirinha
cappuccino
capri sun
celsius
chai
chamomile
champagne
chartreuse
cherryade
cider
cocktail
coconut water / coconut milk
coffee / caffè
cognac
cordial
corona
cosmopolitan
cream
cream soda
curaçao
daiquiri
dr pepper / doctor pepper
eggnog
energy drink / electrolyte / hydralyte / rockstar
espresso
fanta
fireball
flaming volcano
float
folgers
frappé
fresca
gatorade / powerade
gibson
gimlet
gin
ginger ale / schweppes
granita
grenadine
grimace shake
horchata
hot chocolate / hot cocoa
hug
hwachae
iced tea / arizona / nestea
ipa
irish Cream
jarritos
juice
kahlúa
kefir
kombucha
kool-aid
kvass / kvas
lager
lassi
latte
lemonade
limeade
liqueur
liquid death
liquor / spirit
macchiato
mai tai
malt
manhattan
margarita
marsala
martini
matcha
mead
mezcal / mescal / illegal
midori
milk
milkshake / shake
mimosa
mint julep
mocha
mocktail
mojito
monster
moonshine
moscow mule
mother
mountain dew
nectar
negroni
noni
oj
orangeade
orgasm
paloma
patxaran
pepsi
pilk
piña colada
pog
potion
prime
punch
rakı / raki
red bull
root beer
rosé
rum
sake
sarsaparilla
sattu
scotch
sherry
shirley temple
slushie / slushy / slush / slurpee / icee
smoothie
snapple
soda / cola / coke / pop / soft drink
soju
solo
sparkling water / seltzer / bubbl'r
sprite
spritzer
stout / guinness
sumac-ade
sunkist
tea
tepache
tequila
thickshake
ting
tonic
v
vermouth
vodka
water / h2o
whiskey / whisky
wine
yakult
yerba mate

[flavors]
= flavours / tastes
sweet / sweetness
salty / salt / saltiness
umami / savory / savoury / savoriness / savouriness
sour / sourness
mild / bland
strong / flavorful / flavourful
bitter / bitterness
spicy / spice / spiciness / hot / kick
cheesy / cheesiness
creamy / creaminess
earthy / earthiness
nutty / nuttiness
refreshing
minty / mintiness
fruity / fruitiness
tangy / tanginess
tart / tartness

[media]
application / app / software
art
blog
book
comic
billboard
commercial / advertisement / ad
concert
thumbnail
album
analog
digital
single
extended play / ep
browser
mixtape
episode
sprite / texture
flyer
scene
improv / improvisation
comedy
data / datum
metadata
game / video game
chart / diagram / graph
infographic / graphic
abstract
gacha
asmr
slide
do-it-yourself / diy
slideshow / powerpoint / presentation
script
font
fantasy
board game / ttrpg
fiction / fictional
nonfiction
audio
hashtag
gif
play / screenplay
opinion
editorial
fanart
fanfiction
cartoon
manhwa
anime
document / pdf
documentary
docuseries
spreadsheet
manga
image / photo / photograph / picture
journal
magazine
movie / film / cinema
music / song
news
article / piece
newspaper
podcast / pod
poem / poetry
haiku
limerick
poster
radio
streaming
livestream / broadcast
television / tv / show
video
vlog
website / webpage / internet
wiki
zine
social media / post

[music genres]
= musics
acapella
alt-rock
alternative / alt
ambient
experimental
ballad
jumpstyle
musical / broadway
waltz
bolero
boogaloo
gregorian chant
heavy metal
death metal
power metal
grindcore
drum and bass / d&b / dnb / drum 'n' bass
ragtime
electro swing / swing house
easy listening
hymn
oldies
psychedelia / psychedelic
rockabilly
tarantella
mashcore
complextro
emoviolence
fado
grebo
powerviolence
rocksteady
hyperpunk
bachata
gamelan
deathcore
dariacore / hyperflip
solo
duet / duo
screamo
trance
shanty
jingle
impressionist / impressionism
scene
yodel
fandango
baroque
mariachi
karaoke
synthwave
bebop
gospel
afrobeat
boogie-woogie / boogie
bluegrass
blues
bossa nova
breakcore
c-pop / mandopop / mandapop
chiptune
cover
instrumental
soundtrack
choir
city pop
classical / classic
country
crunk
cumbia
dance
dancehall
dirge
disco
doo-wop
drill
dubstep
edm / electronic dance music
electronic / electric / electro
electronica
electropop
emo
fabloo "this genre was made up by **tally hall**, and later abandoned"
flamenco
folk
forró
funk
fusion
gabber
gothic / goth
grunge
hardcore
hardstyle
hip-hop
house
hula
hyperpop
idm / intelligent dance
indie
j-pop / jpop / japanese pop
jazz
k-pop / kpop / korean pop
lo-fi
love / romantic / romance
lullaby
mambo
metal
metalcore
moombahton
nerdcore
nightcore
noise
nu / nu metal
opera
orchestra
parody
phonk
polka
pop / popular
progressive / prog
punk
r&&b / rhythm and blues / rhythm && blues / rnb
rap
rave
reggae
reggaeton
remix
rock
rumba
salsa
samba
sertanejo
shoegaze
ska
soul
speedcore
swing
symphony
tango
techno
trap
trot
vallenato
vaporwave / vapourwave
hypertone
vocaloid / utauloid / utau / miku / hatsune miku / miku hatsune / hatsune / teto / kasane teto / teto kasane / kasane

[accessories]
= fashion
& clothing
& footwear
amulet
anklet
armor
beanie
belt
beret
shackle
blindfold
quiver
boa
bow / bowtie
bracelet
braces
brimhat
brooch / broach
buckle
burqa
button
cane
cap
chain
chainmail
charm
chestplate
choker
collar
crown / tiara
cuff
earbuds / earphones / airpods
earmuffs
earplugs
earring / piercing
fedora
fez
gag
gaiter
garter
girdle
glasses / eyeglasses / brille
glove
goggles
handbag / purse / pocketbook / tote
handkerchief / kerchief
harabah
hat
hazmat
headband
headphones
headscarf
helmet
hijab
horseshoe
jewelry / jewels / ice
keffiyeh / hattah / ghutrah / shemagh
kippah
lace
lapel
leash
lei
locket
loincloth
mask / facemask
medal / medallion
mitt
mitten
monocle
mouthguard
muffler
neckerchief
necklace
necktie
pad
pendant
pin
pocket
pocketwatch
puppet / poppet / poppit / moppet / mommet / pippy
ribbon
ring
rosary
rubik's cube
scarf
shinguard
shoelace
sleeve
snorkel
sombrero
stilt
sun hat
sunglasses
suspenders
tattoo
thong
tie
ascot
top hat
turban
umbrella / parasol
velcro
visor
watch / wristwatch
wig
zipper

[clothing]
= garment / clothes / apparel / attire / garb / wear
abaya
anorak
áo dài
apron
fursuit
cowl
hood
balaclava
bandana / bandanna
trunks
merch / merchandise
shawl
bib
blazer
codpiece
undershirt
dickey / dickie / dicky / tuxedo front
crop top
bloomers
blouse
bra / brassiere
breech
toga
leotard
jockstrap / supporter
smock-frock / smock
chino
camisole
camouflage / camo
cape
capris
cardigan
cassock
chemise
cloak
coat
corset
costume / cosplay
coveralls
cravat
culottes
dashiki
diaper
dirac
dirndl
dress / frock
romper
fishnet
flannel
gabardine
getup
gilet
gown / ballgown
greca
hanbok
hoodie
housecoat
jacket
jeans
jersey
jodhpurs
jorts
skort
slacks
jeggings
gi
jumper
jumpsuit
kaftan / caftan
khaki
kilt
kimono
knickers
leather
lederhosen
leggings
lingerie
miniskirt
muumuu
nightgown / nightclothes / nightshirt
niqab
onesie
outerwear
outfit
overalls
overcoat / overshirt
pajama / PJ / PJs
pants / trousers / bottoms
pantsuit
parka
peplum
petticoat
pinafore / pinny
polo
poncho
pullover
qipao / qi pao / cheongsam
raincoat / rain jacket
robe / bathrobe
tutu
singlet
sari
sarong
sash
scrubs
shirt / top
shorts
skirt
spacesuit
speedo
suit
sundress
sweater
sweatpants
sweatshirt
sweatsuit
swimwear / bathing suit / bikini / swimsuit
t-shirt / tee / teeshirt
tracksuit
tank top
trenchcoat
tunic
turtleneck
tuxedo / tux
underwear / panties / panty / boxers / briefs / undergarment / tights / pantyhose / underpants / undies
negligee
uniform
veil
vest
vestment / chasuble
waistcoat
warmer
wetsuit
windbreaker
woolen

[footwear]
bakya / bakyâ
balgha
ballet
boot / booty
brogan
brogue
stiletto
flipper
vans
buskin
cleat
pump
clog
skechers
timberland / timbs
asics
croc
flip-flop / jandal / chancla
galosh
heely / roller
high heel / high-heel
leg warmer / kneesock
thigh high
geta
rubber boot / gumboot
sapogi
trainer
kick
klomp
loafer / slip-on
moccasin
mojari
mukluk
sandal
shoe
skate
ski
slide
slipper
sneaker
sock
spike
stocking
wader
zori

[sports]
american football / football
archery
badminton
baseball / banana ball
tee-ball / t-ball
flag football
gaelic football
basketball
shot put
parkour
croquet
gymnastics
skydiving
longball
dragon boat
chessboxing
billiards / pool / snooker
bowling
pato
sumo
foosball / table football / fußball
air hockey
boxing
juggling
long jump
bullriding
bocce / bowls / lawn bowls
pétanque
dodgeball
quidditch
finska
free solo
canoeing
caber toss
yoga
bungee jumping / bungy jumping
capoeira
cheerleading / cheer
chess
climbing / mountaineering
cricket
curling
cycling / biking / bicycling
darts
disc golf / disk golf
diving / scuba
esports / gaming
fencing
four square
futsal
golf
handball
hockey / ice hockey
track and field / track
aikido
putt-putt / mini golf / miniature golf
triathlon
hopscotch
horseback riding / equestrian / horse racing / horses / derby / rodeo / horsing
roller skating / roller blading / roller derby
jai alai
jiu jitsu / jujutsu / jujitsu
savate
laser tag
paintball
airsoft
cornhole
tchoukball
jousting
judo
karate
kayaking
kempo
krav maga
kung fu
lacrosse
marathon
martial arts / combat / fighting
mma
motorsport / cars / motor racing / motor / formula one
muay thai
netball
olympics
parasailing
pentathlon
pickleball
ping pong
pole vaulting
kickboxing
luge
bobsleigh / bobsled
rafting
rowing
rugby
australian rules football / australian football
slacklining
running / racing / race / run
silat
skating / skateboarding
ice skating / bandy
skiing
snowboarding
soccer / association football / fútbol / footy
leapfrog
deadlift
kī-o-rahi
aerobics
sprint football
canadian football
racquetball
field hockey
softball
squash
surfing
biathlon
red rover
limbo
swimming
table tennis
taekwondo
tag
tennis
volleyball
wakeboarding
decathlon
heptathlon
slalom
motocross / mx / bmx
water polo / polo
pogo
weightlifting / lifting
wiffle ball
wrestling

[sports equipment]
= sport equipment
arrow
ball
treadmill
gi
snowboard
base / plate
mallet
shuttlecock / birdie / birdy
hoop
shinguard
dartboard
backboard
bungee cord / bungy cord
pogo stick
bobsleigh / bobsled
shot
airsoft gun
dodgeball
javelin
trampoline
dumbbell / weight
saddle
horseshoe
barbell
pole
mouthguard
kettlebell
hula hoop
baseball
oar
paddleboard
paddleball
tee
basketball
goggles
bat
bicycle / bike / cycle
bow
target
bowling pin / pin
canoe
cleat
crease
football / gridiron
frisbee / flying disk / flying disc / disk / disc
discus
cone
glove
goal / basket / net / goalpost
golf club / club
golfball
helmet
hockey stick / stick
iron
jersey
jumprope
kayak
kite
longboard
pad
pickleball
puck
racket / racquet / paddle
skate
skateboard
ski
snorkel
soccerball
softball
spike
surfboard
tennis ball
volleyball
wicket
rowboat

[vehicles]
= craft / vessel
airplane / plane / aircraft / aeroplane / aerocraft
ambulance
backhoe
barrow
bicycle / bike / cycle
airbus
biplane
blimp / airship
carrier
flatbed
supercar / exotic car
holden
opel
vauxhall
cadillac
renault
lifeboat
infiniti
airlift
monster truck
atv
porsche
food truck
dodge
suzuki
fiat
mazda
miata
rig
rivian
jalopy / decrepit
dinghy
steamboat / steamship
caboose
tugboat
chevrolet / chevy
boxcar
starship
cessna
whaler
boat
bulldozer / dozer
ferrari
lamborghini / lambo
volvo
bugatti
bumper car
roflcopter
bus / shuttle / omnibus
volkswagen / vw
audi
caddy
cab / taxi
cabriolet
camion
camper / rv / campervan / motorhome / caravanette / 4x4
funicular
vtol / v//stol
excavator / digger
schooner
galleon
canoe
car / automobile
caravan
carriage
cart
caterpillar
chaise
chariot
coach
coach charabanc
convertible
coupé / coupe
crane
cruise ship
cruiser / police car
cybertruck
destroyer
drone
dump truck
ev / electric vehicle / electric car
ferry
firetruck / fire engine
ford
forklift
glider
go kart / kart
gondola
hangglider
hansom
hatchback / hatch
hearse
helicopter
honda
hot air balloon
hoverboard
hovercraft
humvee / hummer
hyundai
jeep
jet
jetpack
jetski
jinricksha / jinrickshaw / jinrikisha / jinriksha
kayak
komatik
landaulet / landaulette
lexus
limousine / limo
locomotive
mech / mecha
minecart
minibus
minivan
monowheel
moped
motorboat / speedboat
motorbus
motorcycle / motorbike / motorbicycle
mustang
nissan
paddleboard
parachute
paraglider
penny-farthing / high wheel / high wheeler / ordinary
plough / plow
racecar / racing car / sports car
raft
rickshaw
roadster
rover
rowboat
sailboat
scooter
seaplane
segway
semitruck / semi
ship
skateboard
sled / dogsled
sleigh
snowmobile
spaceship / rocket
steamroller / roller / roadroller
subaru
submarine
suburban
subway / metro
suv
sweeper
tandem
tank
tanker
telega
tesla
titanic
toboggan
tonga
tow truck
toyota
tractor
trailer
train
tram / tramcar / streetcar / trolley car
tricycle
trolley
truck / lorry
tuk-tuk
uber / lyft
ufo / uap
unicycle / monocycle
ute
van
wagon / waggon
wagonette / waggonette
warship / battleship
frigate
wheel / tire / tyre
wheelbarrow
wheelchair
wheeler
wildcat
yacht
zeppelin

[instruments]
accordion
alghoza
alphorn
alto
jug
aquaphone
clapstick / bilma / bimli / clappers / musicstick
archlute
theorbo
contrabass
zurna
tabl / tapan / atabal / davul
pommer / bombard
slapaphone
stratocaster / the strat
harpsicord
shekere
cabasa
agogô
vibraslap
helicon
sackbut
viol / gamba
cimbasso
buccin
squeezebox
bawu
amplifier / amp
balalaika
clavinet
taiko
boomwhacker
groan tube
pan flute
shamisen
english horn
kettledrum
yangqin
xalam
autoharp
concertina
turntable
woodwind
mellotron
crotale
flugelhorn / fluegelhorn
bagpipes
celesta / bell-piano
bandurria
banjo
baritone
bass
basset
bassoon
kazoo
bell
berimbau
bongo
bugle
cajón
calliope
castanets
cello / violoncello
chimes
chimta
clarinet / clarinette
clarsach
claves
clavichord
conga / tumbadora
cor anglais
cornet
cowbell
crash
crwth
cymbal
descant
dhime
didgeridoo
dizi
djembe / jembe / jenbe
dobro
dombra
drum
drumstick
dulcimer
eigenharp
ektara
erhu
esraj
euphonium
fiddle
xiao
ruan
guan
luo
xun
qing
gudi
liuqin
qinqin
sanxian
yueqin
huqin
morin khuur / horsehead fiddle / matouqin
zhu
fife
flageolet
flute
fusetar
garklein
ghatam
glockenspiel
gong / tam-tam
guitar
guitarrón / guitarron
xiqin
guqin
guzheng
hang
harmonica
harmonium
harp
harpsichord
hi-hat
horn
hulusi
hurdy gurdy
kalimba / mbira / zanza
kantele
keyboard
keytar
kontra / contra
kora
koto
lili'u
lute
lyre
mando-bass
mandocello
mandola
mandolin
maracas / shaker / chac-chac
marimba
mayonnaise / mayo
mellophone
melodica
metronome
microphone / mic
nyckelharpa
oboe
ocarina
octobass
organ
otamatone
oud
pan
panduri
pennywhistle
percussion
piano
pianola
piccolo
pipa / p'i-p'a
planks
psaltery / sawtry
pungi
rainsticks
rebab
rebec
recorder
ride
santoor
sarangi
sarinda
sarod
saxhorn
saxophone / sax
saxtuba
shawm
shehnai
sheng
sitar
slapstick
slinky
snare
sopranino
soprano
sousaphone
steelpan
stylophone
suona / laba
lusheng / ghengx / qeej
suroz
sursingar
synthesizer / synth
tabla
tambourine
tenor
tenoroon
theremin
thundertube
timpani
tom / tom-tom
treble
tremoloa
triangle
trombone
trumpet
tuba
tubax
u-bass
ukubass
ukulele / uke
veena
venova
vibraphone
viola
violin
vocaloid / utauloid / utau / miku / hatsune miku / miku hatsune / hatsune / teto / kasane teto / teto kasane / kasane
voice / vocals
whamola
whistle
wineglass
xaphoon
xylophone
yotar
zither

[household objects]
= objects
& chess pieces
abacus
ac / air conditioner
afghan
alarm / siren
gear / cog
stash
microscope
pastel
taxidermy
sextant
generator
microchip
bubbler / water fountain
cross
wingnut
nut
bolt
spring / coil
stanley
amphora
anchor
antenna / antennae
anvil
tripod
incense
divider
ticket
appliance
trophy
armchair
atlas
thing
novel
cutter
throne
passport
projector
backpack
bag
balloon
bandage / dressing / bandaid / gauze / plaster
barometer
basket
bassinet / stroller / pram
bath / bathtub / tub
battery
beaker
beanbag
bed
bedframe
bench
bible
bidet
bin
blanket / sheet / bedsheet
bleach
blender
block
bong
book
bookcase
bookmark
bookshelf
boombox
bottle
bouquet
bowl
boxcutter
bread knife
bread tag / occlupanid
breadbox
breaker
broom
broomstick
brush
bucket / pail
butter knife
cabinet
cage / birdcage
calculator / calc
calendar
camera
candle
candlestick
canvas
card
carpet / rug
carton
cartridge
case
cassette / videocassette / vhs
cd / compact disc
ceiling
cellphone / smartphone / iphone / android
chain
chair / seat
chalice
chalkboard
chandelier
chapstick
charger / power bank
check
checkbook
chessboard
chopsticks
bead
nightlight
churn
cigar
cigarette
clamp
clasp
clip
clipboard
clipper
clock / clockwork
clothes
clothespin
coaster
coffee maker / brewer
coin
comb
comforter
compass
computer / pc / mac / imac / system
conditioner
console / xbox / playstation / ps5
controller
cookbook
cookiecutter
cooler
corer
cork
corkscrew
cot
couch
counter / countertop
cover
crate
crayon / crayola
credenza
crib
crowbar / prybar
cupboard
curtain / blinds / shades
cushion
cutlery
cutting board / chopping board
dartboard
dehumidifier
deodorant / cologne
desk
detergent
device
dial
diary
dicer
dictionary
die / dice / d20
dish
dishwasher / washer
dispenser
doll / dolly
dollhouse
domino
dongle
door
doorbell
doorframe
drawer
drawing
dreamcatcher
dresser
dryer
duster
dustpan
duvet
dvd
dvd player / cd player
dye
easel
encyclopedia
engine / motor
envelope
equipment
eraser
extinguisher
fan
fastener
faucet / tap
fax
figure / figurine
fireplace
firewood
fixture
flag
flashlight
flask
floor
floss
flyswatter / swatter
folder
footstool / footrest
fork
frame
freezer
fridge / refrigerator
frier
furnace
furniture / furnishing
futon
gallon
gameboy
ds / dsi / 3ds
pump
gauge
gavel
glass / cup
globe
goblet
gramophone
grater
grill / grille / barbie / barbecue / bbq / barbeque
ground fault indicator
hairclip
hairdryer
hammer
hamper
handle
hanger
hassock
hdmi
heater
highlighter
hinge
hoe
holder
hose
hourglass
house plant
humidifier
icebox / cold closet
ink
iron
jar
jenga
joystick
jug
jukebox
keg / barrel / cask
kettle
key
keyboard
keychain
kindle / e-reader
knife
knob / doorknob
knot
kong
ladder
ladel
ladle
laminator
lamp
lampshade
landing
landline
lantern
lanyard
laptop / macbook
laser / lazer / pointer
laser pointer
laundry
lawnmower
leaf blower
lego
letter / mail
lever
lid
light / lightbulb / bulb
lighter
lipstick
lock / padlock
loofah / loofa
lotion
loveseat
luggage / baggage / suitcase
machine
magazine
magnet
mailbox
makeup
mallet
mannequin
mantle
map
marker
mascara
mat / placemat
match / matchstick
matchbox
mattress
measuring tape
menorah
microphone / mic
microwave
mirror
mixer
money / cash / bill / banknote
monitor / screen / desktop
mop
mouse
mousepad
mouthwash
mp3 player / music player / ipod
mug
nailgun
napkin
needle / syringe
nes
newspaper
nightstand
note / sticky note / post-it
cauldron
notebook / notepad
ointment
opener
origami
ornament / bauble
ottoman
outlet
oven
page
pager / beeper
painting
palette
pan
paper / document / paperwork
diploma
paper towel
paperclip
peeler
pen
pencil
perfume
pestle
phone / telephone
photo / photograph / picture / polaroid
pickaxe
pill / medication / medicine
pillow
pillowcase
pin / pushpin / tack / thumbtack
pint
pipe / plumbing
pitcher
pivot
plaque
plate
pliers
plug / usb
plunger
plush / plushie / stuffed animal / teddy bear / teddy
portrait
poster
pot / crock / crockpot
printer
processor
protractor
puzzle / jigsaw
quill
quilt
quran
rack / hatrack
radiator
radio
rag
rake
razor / shaver
razor blade
recliner
record
recorder
remote
retainer
rice cooker / cooker
ricer
roll
roof
roomba
rope
router / wifi / internet
rubber band
ruler / straightedge
sack
safe
sandpaper
saucepan
saw
scale
scanner / copier / photocopier
scissors / shears "**paper**!"
sconce
screwdriver
shampoo / body wash
sharpener
shelf / shelve
shoebox
shovel
shower
showerhead
shredder
sign
sill / windowsill
silverware / utensil
sink / basin / washbasin
skillet
skylight
sledgehammer
snes
snowglobe
soap
sofa
spade
spanner
spatula
sponge
spool
spoon
spork
stairs
stand
standee / cutout
stapler
step / stair
stepladder / step stool
stereo
sticker
stool / barstool
stopwatch
stove / stovetop / cooktop
strainer / colander
thimble
straightener
straw
stud
sun roof
switch / lightswitch
table
tablecloth
tablespoon
tablet / ipad
tampon
tank / aquarium / fishbowl
tape
tapedeck
tapestry
tava / tawa
teacup
teapot
teaspoon
telescope
television / tv / telly
tenderizer
terrarium
thermometer
thermos
thermostat
thesaurus
tile
timer
tissue / kleenex
toaster
toaster oven
toilet / loo / crapper
toilet paper / loo paper
tongs
tool
toolbox
toothbrush
toothpaste
toothpick
top / spinner
torch
tourniquet
towel
toy
toybox
trapdoor
trash can / dustbin / garbage can / garbage bin / wastebasket / rubbish bin
tableware / tupperware
tray
typewriter
uno
urn
vacuum / hoover / dyson
vanity
vape
vase / pottery
vat
vcr
vent
vhs player
vice
video graphics array / vga
walkie-talkie
wall
wallet
wallpaper
wardrobe
washboard
washcloth
washing machine / the wash
whetstone
whirligig
whisk
whiteboard
wick
wii / wiiu
windchime
window / pane
container / storage
wire / cable / chord / cord
wok
wrapper
wreath
wrench
yearbook

[materials]
adobe
aerogel
alloy
asbestos / asbestus
asphalt
brass
brick
plaster
powder
parchment
tile
bronze
cardboard
tar
gel
fuel
lubricant / lube
crochet
knit
slab
pallet
putty
cashmere
cement
tinder
bracket
corium
ceramic
pavement
chiffon
papyrus
clay
cloth
concrete
cork
cotton
denim
drywall
electrum
fabric
felt
flannel
fleece
foil / tinfoil
fordite
galvanized steel
glass
glue
gravel
grout
hair
hemp
hide / fur
invar
jersey
kaolinite / kaolin
corduroy
kevlar
pleather
mesh
stucco
adhesive
galinstan
tweed
tarpaulin
spandex
burlap
lace
latex
leather
linen
mortar
mulch
nail
nichrome
nylon
paint
paper "**scissor**s!"
peat
pewter
plastic
polyester
polymer
porcelain
rattan
rayon
rebar
rubber
satin
screw
shingle
silicone
silk
skin
slag
solder
stainless steel
staple
steel
straw
string / thread
styrofoam
teracotta
terracotta
thermite
twine
velvet
vinyl
wax
wicker
board
wood / lumber / timber
wool
yarn

adamantite
mythril

[structures]
= buildings
airport
apartment / flats
aquarium
passage
department
airlock
cockpit
dormitory / dorm
trough
classroom
seesaw
minaret
rotunda
slum
auction house
gulag
hospice
aqueduct
pulpit
buttress
arcade
attic
ward
courthouse / court / courtroom
treehouse
aviary
oil rig
farmland / cropland
dumpster
cairn
thrift store / thrift shop
brothel / strip club
dōjō
amusement park / theme park
pump
aquifer
roost
automated teller machine / atm
haunted house
buoy
façade / exterior
ledge
hammock
quay
tightrope
wharf
confessional
clothesline
sandbox
avenue
portal
backyard
bakery
pigsty
balcony
ballroom
bank
bar / pub / saloon
shipwreck
sandcastle
clock tower / big ben
watchtower
monastery
nunnery
barbershop
barn
barracks
basilica
bastion
bathroom / restroom
sunroom
souk / suq / bazaar
bedroom
bistro
bookstore
bouncy house / bounce house / bouncy castle / bounce castle
bridge
bungalow
bunker
cabin
cafeteria
café
campus
casino
castle
cathedral
cell
cellar / basement
cemetery / graveyard
chamber
chimney
church
chapel
circus
citadel
city
clinic
closet
complex
conservatory
coop
crypt
curb
data center / data centre
call center / call centre
deck
den
diner
dock / pier / marina
doghouse
dome
elevator
escalator
facility
factory
farm
fence
fort / fortification
fortress
foundation
fountain
frame
garage
garden
gargoyle
gate
gazebo
grave / tomb / gravestone / tombstone
greenhouse
gymnasium / gym
hall
hallway
hangar
headquarters
helipad
helter-skelter
highway / freeway / interstate / expressway
toll booth / toll road
hospital
hostel
hotel
house / home / household
hull
hut
igloo
infrastructure
inn
institute
institution / asylum
vineyard
intersection
jungle gym
keep
kennel
kingdom
kitchen
laboratory
lawn
library
sauna
carousel / carrousel / merry-go-round / galloper
streetlight / streetlamp
crosswalk / crossing / zebra lines / crossroad
campfire / bonfire
camp
laundromat
street sign / stop sign
parking lot / car park / lot
lighthouse
mall
manor
mansion
market
mausoleum
memorial
metropolis / metropolitan area
mine
monorail
monument
mosque / kaaba
motel
museum
neighborhood
nursery
obelisk
observatory
office
pagoda
palace
park
path
patio
pavilion
pedestal
pharmacy
pillar / column
townhouse
orchard
kiosk
deli
pizzeria / pizzaria
playground
plot
pole / rod / shaft
pool
porch
port
porta-potty / porta john / portable toilet
post office
prison / jail / gaol
pylon
rail / railway / railroad
ramp
restaurant
rink
road / street / way / boulevard / lane / alley / alleyway / roadway / route / driveway
sidewalk / pavement / footpath
rollercoaster
room / interior
roundabout / rotary / traffic circle
ruins / wreck
salon
satellite
scarecrow
school
sentry
sewer / sewage
shed
shelter
silo
site
skyscraper
slide
stadium / arena
spa
sarcophagus
stage
stall
station
statue
stonehenge
stoplight
store / shop / mart
suburb / suburbia
supermarket
swing / swingset
synagogue
taqueria
tarp
tavern
teepee / tipi
tiki
totem
temple
tent
terminal
theater / theatre / cinema
amphitheater / amphitheatre
loft
harem / harim
tower
town
track / racetrack
trampoline
tunnel
turbine
university / college
venue
village
warehouse
well
windmill
workplace
workshop / workroom / atelier
studio
yard
zone
zoo / enclosure
apiary / bee yard
condo
scaffold / gallows
maze / labyrinth
armory / armoury
slaughterhouse
gallery
abbey
shack
landfill / dump
incinerator
cottage
penthouse
stable
stroad
water slide
hamlet
empire
corridor
outpost
spire
shrine
platform
dungeon
flagpole
abode
nightclub
portcullis
vault
villa
shipyard
waterpark
capital
lounge
trellis
mill

[weapons]
= arms / armament
agent orange
ak-47 / ak47 / kalashnikov
anthrax
ar-15 / ar15
arrow
artillery
arbalest / arblast
axe / ax
wakizashi
shotel
urumi
ikakalaka / konda
semtex
hacksaw
m4a1 / m4
switchblade
airsoft gun / airgun / pellet
akm
groza / ots-14
messer
cudgel
shillelagh
flashbang / thunderflash / flash grenade / stun grenade
peashooter
ballista
baton
battering ram
battleaxe / battleax
bayonet
bazooka
bb / bb gun
belt
beretta
blade
blowgun / blowdart / blowpipe
bioweapon
neurotoxin
bullpup
sai
arquebus
kusarigama
kama
truncheon
molotov
blunderbuss
bolt
bomb / explosive
boomerang
bow
boxcutter
brass knuckles / knuckleduster
broadsword
bullet
candlestick
cane
cannon
cannonball
catapult
chainsaw
chisel
chloroform
claymore
cleaver
club / bludgeon / nightstick
woodchipper
mjölnir
colt / m1911
gauntlet
water gun / water pistol / water blaster
mousetrap
crossbow
crowbar / prybar
cutlass
dagger
dao
desert eagle / deagle
dirk
dynamite
épée
excalibur
fighter jet
firework
flail
flamethrower
flintlock
fork
gladius
glaive
glavier
glock
greatsword
grenade
grimoire / spellbook
guandao
guillotine
gun / firearm
gunpowder
halberd
handgun
harpoon
hatchet
howitzer
icbm
jackhammer
firebomb
greathammer
javelin
karambit
katana
katar
khopesh / khepesh
knife
kris
kunai
labrys
lance
lasso
lightsaber
longbow
shortbow
atlatl / spear-thrower
buckler
bō
bolas
longsword
mace / morningstar
machete
magazine / mag
mallet
mameluke
maul
mine / landmine
minigun
missile
montante
musket
mustard gas
napalm
nuke / nuclear / atom bomb / a-bomb
hydrogen bomb / h-bomb / thermonuclear
thermobaric / aerosol bomb / vacuum bomb
naginata
c-4
carbine
grapeshot
caltrop
flamberge / floberge / froberge
falchion
nunchaku / nunchuku / nunchuks / nunchucks / chainsticks
orbital cannon
pepper spray
pike
pipe bomb / mailbomb
pistol
pitchfork
poison
polearm
poleaxe
quarterstaff
railgun
rapier
revolver
rifle
rocket / rpg
saber
saw
scalpel
scepter
scimitar
scythe
shank
shield
shiv
shortsword
shotgun
shuriken
sickle
sledgehammer
slingshot / sling
sniper
spear
staff
stake
stiletto
submachine / smg
sword
tank
taser / stun gun
hwacha / hwach'a
tear gas
tnt / trinitrotoluene
tomahawk
tommy
torpedo
trebuchet
trident
turret
uzi
venom
wand
warhammer
warhead
water balloon
whip
yan
zweihänder / doppelhänder / beidhänder / bihänder / bidenhänder

[body parts]
= body / human body
& cell organelles
ab / abs
abdomen
acetabulum
acne / pimple / zit
adam's apple
adenoid
adrenal
afro
alveolar ridge
alveolus
amygdala
hump
ankle
antenna / antennae
blubber
gristle
flab
antler
aorta
appendix "this organ has no use to modern humans"
arch
arm
armpit / underarm
artery
auricle / pinna
back
backhair
bangs
barb
barbicel / hooklet
barbule
beak / bill
beard
belly / tummy / tum
biceps
bladder
blister
blood
blowhole
bone
bowel
brachialis
braid
brain / mind
brainstem
breast / boob / tit / titty / teet / mammary / booby
bronchi
bronchiole
bronchus
bruise
butt / ass / butthole / buttocks / anus / bum / arse / asshole / rear / buttcheek / rump / anal / pooper
calf
canal
canine
canker sore
capillary
capitate
carpals
carpometacarpus
cartilage
cavity "please take care of your teeth"
cecum
cell "you have about thirty-six trillion of these"
cerebellum
cerebrum / cerebral
cervix / cervical
chamber
cheek "no other animal can blush like us"
cheekbone / zygomatic
chelidon / elbowpit / cubital fossa / wagina / cough-into
chest
chin
circulation
clavicle / clavicular
claw
clitoris / clit
cloaca
coccyx
collarbone / collar
colon
cone
core
cornea
corona
corpus callosum
cortex
cuticle
deltoid / musculus deltoideus
dermis
dewclaw
diaphragm
dimple
dorsal fin / dorsal
duodenum
ear
eardrum
earlobe "we aren't sure what the purpose of them is"
ears
elbow
elytra
enamel
epidermis
epiglottis
esophagus / oesophagus / throat / maw / airway
ethmoid / ethmoidal
exoskeleton
eye / eyeball
eyebag
eyebrow / brow
eyelash / lash
eyelid
face / facial
fallopian tube
false vocal cords
fang
fat
feather / quill / crest / plumage
femur
fiber / fibre
fibula
fin
finger "fingerprints are so unique, even identicial twins don't share them"
fingertip / fingerprint
fist
flesh
flipper
follicle
foot / feet
forearm
forehead
foreskin
freckle
frenulum
fringe
frontal lobe
fundus
funny bone "it's actually a **nerve**"
fur / fuzz
gallbladder
gene / genome
gill
gland
glottis
glute / gluteal
goosebump "every mammal gets these!"
gullet
gums
gut
hair / bristle / tuft / hackle
hairline
hamate
hamstring
hand
hangnail
head / noggin
heart "yours will beat more than three billion times in your life"
heel
hip
hippocampus
hoof
humerus
hyoid
hypothalamus
gastrocnemius
alveoli
axon
vas deferens
interstitium
pincer
stamen
cuttlebone
cochlea
ganglion / ganglia
vitreous humor
atrium
carotid
birthmark
thalamus
areola
ileum
ilium
incisor
incus / anvil / incudes
index
instep
intestine
iris
ischium
jaw
jawbone
jawline
jejunum
joint
jowls
kidney
knee
kneecap
kneepit / hough / popliteal fossa
knuckle
labia
lap
laryngopharynx / hypopharynx
larynx
latissimus / lateral / lats
leg
lens
ligament
limb / appendage
lipid
lips "some of the most sensitive parts of the body"
liver
lobe
loin / crotch / groin / genital
lumbar
lunate / semilunar
lungs
lunula
lymph node / lymph
malleus
mandible
mane
mantle
manus
marrow
maxilla / maxillary
medulla
melanin
membrane
mesocolon
metacarpal
metatarsal
mohawk
molar
mouth / frown
mullet
muscle "this word comes from latin for **little mouse**"
mustache / moustache
nail / toenail / fingernail / thumbnail
nails
nape
nasopharynx
navel / belly button
neck
nerve
neuron
nipple
nose / nasal
nosehair
nostril
notochord
nub
occipital
occipital lobe
organ
oropharynx
ossicle
ovary
ovipositor
palate
palm
pancreas
parathyroid
parietal lobe
patella
paw
pectoral / pecs
pelvis
penis / cock / dick / dih / peepee / phallus / glans
peritoneum
phalanges
pharynx
philtrum
pinion
pinky
pisiform
placenta
pons
pore
pouch
premolar
privates
proboscis
prostate
pube
pubis
pulse
pupil
pylorus
quadriceps / quads
radius
rash
rectrix / rectrices
rectum
remex / remiges
retina
ribs / ribcage "these could be fractured if you sneeze too hard. be careful!"
rod
sacrum
saliva
scab
scale
scalp
scaphoid
scapula
scapular
scar
sclera
septum
shell
shin
shoulder
shoulder blade
side
sideburn
sinus
skeleton
skin "this is your largest organ"
skull / cranium
snout / muzzle
socket
sole
sperm / semen / jizz
sphenoid
sphincter
spine / spinal cord / spinal column / spinal / backbone
spleen
spur
sternum
stinger
stirrup / stapes
stomach
sweat
tail
tailbone
talon
talus
tarsal / tarsus
tear
tear duct
tectrix / tectrices / covert
temple
temporal
tendon
tentacle
testicles / ballsack / scrotum
thigh
thoracic
thorax
thumb
thyroid
tibia
tissue
toe
tongue
tonsil
oblique
callus / callous
vena cava
tooth / teeth / smile "yours are just as strong as a **shark**'s!"
torso
trachea
tracheole
triceps
triquetrum
trunk
tumor
tusk "this is actually an elongated tooth"
udder
ulna
umbilical
unibrow
ureter
urethra
uterus / womb
uvula
vagina / pussy
vein
velum
ventricle
vertebra / vertebrae
vessel
vocal cords
voicebox
vulva / vulvae
waist
wart
wenis / weenus / weenis
whisker
wing
wrinkle
wrist
xiphoid

[cell organelles]
= organelles
amyloplast
capsule
cell membrane / membrane
cell wall / wall
centriole / centrosome
chloroplast
chromoplast
cytoplasm / cytosol
cytoskeleton
elaioplast
etioplast
flagellum / flagella
golgi apparatus / golgi bodies / golgi / apparatus / golgi complex
leucoplast
lysosome
ribosome
mesosome
mitochondrion / mitochondria "mitochondria is plural, **mitochondrion** is singular"
nuclear envelope
nuclear pore
nucleolus
nucleus
peroxisome
pilus
plasmodesma / plasmodesmata
proteinoplast
rough endoplasmic reticulum / endoplasmic reticulum / reticulum
smooth endoplasmic reticulum
spitzenkörper
tonoplast / vacuolar membrane
vacuole
vesicle
woronin body

[weather]
= meteorology
& clouds
acid / acid rain
allergies
aurora / borealis / northern lights "at this time of year? at this time of day?"
avalanche
blizzard
clouds / cloudy / cloudiness "a **cloud** weighs over a million tons"
cold / cool / frigid / chilly
cyclone / vortex
dew
brisk
drizzle
muddy
zephyr
drought / dry / arid
dust storm / dust devil / sand whirl / simoom
earthquake
eruption
firenado / fire whirl
firestorm
flood / flooding / surge / storm surge / deluge
fog / foggy
frost
gale
graupel
hail / hailstorm
haze / hazy
sun shower
meteor shower
ball lightning
soot
subzero
heat wave / sweltering
hot / heat
humid / muggy / moist / moisture / damp / soggy / humidity
hurricane / typhoon
ice / icy
landslide
lightning
mist / misty
monsoon
mudslide
overcast
rain / rainy / rainstorm / rain storm / rainfall / wet / downpour / precipitation
torrent / torrential / tempest
rainbow
sandstorm
sharknado
shower
sleet
slush / slushy
smog
snow / snowy / snowstorm
snownado
squall
storm / stormy
sunny / sun / clear / sunshine
flurry
enso / el niño–southern oscillation
quicksand
rockfall / rockslide
gustnado
snowdrift
temperature
thundersnow
mirage
forecast
climate
el niño / la niña
haboob
landspout
fair
thunder / thunderstorm
tide
tornado / twister / tornadogenesis
draft / updraft
tsunami
warm
waterspout
wildfire / smoke / smoky
wind / windy / windstorm / gust / breeze / breezy

[clouds]
cirrocumulus
altostratus
pyrocumulus / flammagenitus
cumulus
nimbus
stratus
cirrus
radiatus
duplicatus
altocumulus
cumulonimbus
nimbostratus
pyrocumulonimbus
stratocumulus
cirrostratus
lenticular / lenticularis
nacreous
noctilucent
asperitas
undulatus
pileus
cataractagenitus 
homogenitus
contrail / chemtrail
silvagenitus
wall cloud / murus
roll cloud / volutus
beaver tail / flumen
caudus
horseshoe
fractus
castellanus / castellatus
floccus
lacunosus
stratiformis
nebulosus
fibratus / filosus
vertebratus
intortus
uncinus
spissatus

[landforms]
= landmass / nature / land
& bodies of water
& biomes
& continents
atoll
crevasse
sinkhole / cenote
boulder
archipelago
bluff
cape
mound / knoll
iceberg
slope
badlands
core
stack
steppe
spit
stump
alluvial fan
dome
tectonic plate / plate
mountain range / range
corrie / cirque / cwm
hole
pit / ditch
arch
crater
gorge
foothill
vale
canyon
butte
cave / cavern
rift
headland / head
trench
cliff / crag
grotto / grot
thrombolite
continent
dune
inland
tombolo
glacier
ground
horn
highland
hill
island / isle
islet
isthmus
lowland
mantle
mountain
pangaea / pangea
laurasia
gondwana
peak / summit
peninsula
plateau
ravine / glen / slade
gap
gyre
chasm / cleft
pile
ridge / arete
shelf
supercontinent
valley
inselberg
volcano
pass
geyser

[bodies of water]
= body of water / body / water
arroyo
basin
watershed
groundwater
bay
bayou
bank
beach
rapids
sound
rivulet
marina
inlet
wadi
oxbow
shore
whirlpool / maelstrom
bight
floodplain
meander
mouth
source
bourne
burn
canal
well
channel
strait
coast / coastal / coastline
cove
creek
dam
delta
distributary
tributary / affluent
estuary
firth
fjord
gulf
harbor
headwater
lagoon
lake / loch
levee
marsh
moat
oasis
ocean "we aren't even close to exploring 1% of earth's ocean"
pond
pool
puddle
reservoir
river
sea
spring
stream
brook
swamp
upwelling
waterfall
wetland
fen

[biomes]
alpine
alvar
aquatic
arctic
arid
bog / bogland
boreal
canopy
chaparral
cropland
desert
equator / equatorial
field
forest / woodland
freshwater
glade
grassland
marshland
grove / nemoral
hillside
ice cap
intertidal / foreshore
jungle
littoral / nearshore
mangrove
meadow
mesa
montane / mountainous / mountain / sierra / rocky
moor / barren
mountainside
nearctic
perhumid
plains
polar / snowscape
prairie
premontane
quagmire
rainforest
rangeland
reef
safari
sahara / saharan
saltmarsh / salting
saltwater
savanna / savannah
scrub
shrubland
siberia / siberian
steppes
subalpine
subpolar
subtropics / subtropical
superhumid
swamp
taiga
temperate
tropics / tropical
tundra
undergrowth
wasteland
wetland
xeric

[buzzwords]
5g
agile
ai / artificial intelligence / generative / machine learning / ml / llm / large language model / chatbot / chatgpt / gpt / deep learning / grok / agi
algorithm
as a service / saas
automation / automate / automated / automatization
autonomous / robot / robotics
bluetooth / wireless
cloud
cryptocurrency / crypto / blockchain / bitcoin / btc "$SLOPCOIN TO THE MOON"
cyber
niche
pivot
data
fintech
internet of things / iot
kaban
lost media "wordslop is.. lost media?"
metaverse
nft
problematic "wordslop is.. problematic media?"
quantum
scalability / scalable
smart
strategy
synergy
vibe / vibecode / vibecoder
virtual reality / vr / extended reality / xr / mixed reality / mr
web3
zoom
.com / dotcom
unprecedented
agentic
viral

[fields of study]
= arts / field of work / field of study / fields of work / studies / ology / field
& religions
accounting
acoustics
acupuncture
aerodynamics
aeronautics
agriculture / agronomy / farming
alchemy
stoichiometry
floristry
endocrinology
genealogy
biomedicine
biotechnology
retail
enthoarchaeologist
ethnomusicology
histiography
stratigraphy
taphonomy
typography
hematology
forestry
primatology
humanities
pottery
vulcanology
vexillology
grammar
ornithology
aviation
hydraulics
teleology
nephology
communications
telecommunications
archeology / archaeology
numerology
stem / steam
musicology
hospitality
bioscience
computing
aerospace
dietetics
combinatorics
demonology
drama
civics
physical education / pe
anthrozoology
governance
minerology
hydrography
navigation
phycology
administration
demography
algebra
anatomy
animation
anthropology
magic / witchcraft / sorcery
astrology
architecture
archiving / archive / preservation
arithmetic
astrobiology
metaphysics
astronomy
astrophysics
audiology
biochemistry
bioengineering
bioethics
biology
botany
business
calculus
calligraphy
cardiology
cartography
chemistry
chronology
climatology
cooking / culinary
cosmetology
criminology
cryptography
cybersecurity
dance
dentistry
dermatology
design
development / programming / coding
ecology
economics
education / teaching
egyptology
electrodynamics
engineering
entomology
epidemiology
epistemology
ethics
etymology
eugenics
evolution / evolutionary
fashion
film
finance
forensics
futurology
gemology
genetics
geography
geology
geophysics
glaciology
googology
grammatology
graphemics
gynecology / gynaecology
historiography
history
horticulture
hydrodynamics
hydrology
immunology
informatics
information
journalism
kinematics
law / justice
lexicology
linguistics / language
literature / writing / literary
literacy
lithology
logic
macroeconomics
magnetohydrodynamics
marketing / advertising
masonry
mathematics / math
meteorology
metrology
microbiology
microeconomics
mineralogy
morphology
music
mythology / folklore
nephrology
neurobiology
neurochemistry
neurology
neuropsychology
neuroscience
nuclear science / nuclear physics
nursing
nutrition
oceanography
oncology
ontology
oology
ophthalmology
ophthamology
optics
optometry
orthodontics
osteology
paleontology / palaeontology
pathology
pediatrics
pharmacology / medicine / medical / drugs
phenomenology
philology
philosophy
cynicism
phonology
phonotactics
photometry
photography
phrenology
physics
physiology
pneumatology
poetry
politics / political science / political
psychiatry
psychology
pulmonology
radiology
science
seismology
sociology
spectroscopy
statistics / stats
steganography
stenography
surgery
taxonomy
technology / tech
theatre
theology / theism / religion / religious
therapy
thermodynamics
topology
toxicology
trigonometry / trig
geometry
urban planning / city planning
urology
virology
volcanology
woodworking
zoology

[math]
= mathematics / maths
absolute
acute
addend
addition / adding / plus
aleph null
aleph / ℵ
approximate / approximation
normal
mersenne
cross product
cartesian product
ptolemy
ordinal / ordinality
gradient
commutative / commutation
functional
corollary
conjecture
basis
equiangular
countable
cardinal / cardinality
3-dimensional / 3d
4-dimensional / 4d
distance
depth
implicit
explicit
definition
magnitude
associative / association
conjugate / conjugation
result
similarity / similar
optimization / optimal
mass point
homothetic / homothety
midpoint
midsegment
trisection
hypercomplex
complex
twin
2-dimensional / 2d
natural log / ln
pentation
hexation
injection / injective / one-to-one
bijection / bijective
surjection / surjective
combination / combinatorial
nth
independent
dependent
tensor
heximal / senary seximal
heptimal / septimal
lebesgue
translation
ordered
sohcahtoa
pair
undecimal / hendecimal / elevenary
dozenal / duodecimal
tridecimal / tredecimal / baker's dozenal
unknown
augend
altitude
sheafification
e=mc² / e=mc2
ordinate
divisibility
heuristics
azimuth
torque
cyclic
shape / shaped
lemma
pattern
grid
tetration
asymptote
convex
binomial
concave
reflection
simplification / simplified
reduction
axiom
octal
circa / nearby
formal
consequent
antecedent
linear
transversal
interpolation / interpolating
isomorphism
value
subscript
superscript
algebra / algebraic
parabolic
hyperbolic / hyp
sinh
index / indices
cosh
tanh
coth
sech
csch / cosech
dot
dot product / scalar product
arsinh / asinh / arcsinh
arcosh / acosh / arccosh
artanh / atanh / arctanh
arcoth / acoth / arccoth
arsech / asech / arcsech
arcsch / arcosech / acsch / acosech / arccsch / arccosech
algorithm / algorism
slope
diagram
attribute
complementary
fibonacci
histogram
quartic
quintic
eigenvector
periodic
indefinite
definite
domain
convergence
divergence
maclaurin
ramanujan
conditional
standard
quartile
correlation / correlated / related
recursion / recursive
regression / regressive
fermat
diophantine
goldbach
totient
differential
incongruence
summation
network
sequence
repetition "repetition"
interval
random / randomness
modulo / modulus / mod / modular
euler
pythagorean / pythagoras
arccosecant / arccsc
hypothesis
segment
arccosine / arccos
arccotangent / arccot
arcsecant / arcsec
arcsine / arcsin
arctangent / arctan
area
average / mean
axis / axes
base
binary
bisect
boolean
calculation / calculating
calculus
capacity
chord
circumference
coefficient
composite
concentric
congruent
constant
coordinate / coord
cosecant / cosec / csc
cosine / cos
cotangent / cotan
decimal
hexadecimal / hex
pemdas
bodmas
quaternary
quinary
nonary
bidmas
transcendental
notation
decrement
denary
denominator
derivative / deriving
determinant
diameter
difference
digit
digestive
hymen
dimension
distributive / distribution
dividend
division / dividing
divisor
eigenvalue
equal / equality
equation
equilateral
even
exponent / exponential / power / exp / exponentiation
least common multiple / lcm
expression
factor
factorial
finite
formula / formulation
fractal
fraction
frequency / rate
amplitude
function / fn
geometry / geometric
graph
greater than / greater
gross
height
homeomorphism
hypotenuse
imaginary
increment
inequality / inequal / unequal
series / serial
infinitesimal
infinity / infinite / ∞
integer
integral / integration
intersecting
inverse
irrational
isosceles
length
less than / lesser / less
limit
locus
logarithm / logarithmic / log
logic
matrix
maximum
median
minimum
minuend
mode
multiple
greatest common divisor / gcd
multiplicand
multiplication / times
natural
negative
null
number / numeral
numerator
obtuse
octonion
odd
operand
operation
operator
origin
parallel
percent / percentage
percentile
perfect
perimeter
permutation
perpendicular
pi / 3.14 / π / 3.14159 / 3.1415 / 3.141
point
polynomial
positive
prime / primorial
probability / chance / odds
product
pronumeral
proof
proper
protractor
q.e.d.
quadrant
quadratic
quaternion
quotient
radical
radius
range / spectrum
ratio
rational
real
reciprocal
reflex
remainder
repeating / recurring
revolution
right
root / sqrt / rt
scalar
scalene
secant / sec
set
significant
sine / sin
square
statistics / stats
straight
subset
equivalence / equivalent
superset
subtraction / subtracting / minus
subtrahend
sum / total
surd
symmetry
tangent / tan
ternary
theorem / theory
trace
trigonometry / trigonometric / trig
undefined
union
variable
vector
vertex / vertices
volume
whole
width

[units]
= measure / measurement / metrology
pint
meter / metre
minute
hour
year
ton
tonne
mole / mol
pixel
lūstrum
liter
block
stud
chunk
slug
angstrom
quart
candela
lumen
lux
tesla
foe
bloob
qubit
fermi
micron
twip
gal
mort / micromort
erg
decibel
octave
bel
astronomical unit / au
nautical mile
parsec
thou
line
point
poppyseed
ligne
inch
attoparsec
hand
link
span
foot
cubit
yard
smoot
fathom
rod / pole / perch / lug
furlong
mile
league
light-year
hubble
planck
svedberg
shake
jiffy
second
day
week
fortnight
month
decade
century
millennium / millennia
millisecond
nanosecond
litre
teaspoon
tablespoon
cup
gallon
electronvolt
dalton
grain
carat
gram / gramme
ounce
pound
stone
knot
shed
barn
rood
acre
hectare
barye
pascal
bar
atmosphere
bit
nibble
byte
fahrenheit
celsius
kelvin
rankine
degree
radian
gradian
steradian
calorie
joule
watt
horsepower
newton
hertz
dyne
volt
ampere / amp
katal
rømer / roemer
coulomb
ohm
mho
henry
weber
farad
curie
becquerel
gray
rad
sievert
rem
roentgen

[particles]
& periodic table
antineutron
antiproton
atom
baryon
boson
electron
fermion
gluon
graviton
pion
tachyon
kaon
glueball / gluonium / gluon-ball
pentaquark
hadron
ion
lepton
meson
molecule
muon
neutrino
neutron
nucleus
photon
antimatter
matter
positron
proton
quark
tau

[companies]
= brands
northrop grumman
mlb
nhl
stanley
blackstone
blackrock
fidelity
beats
carnegie steel
standard oil
carlyle group
applebee's
hooters
red lobster
sears
kmart
party city
claire's
carhartt
culver's
firehouse subs
in-n-out burgers / in-and-out
jimmy john's
marriott
nordstrom
dick's sporting goods / dick's
quiktrip
texaco
lucky brand
american eagle
best buy
spirit halloween
ross stores
autozone
spencer's
hot topic
o'reilly
gap
jcpenney
belk
homegoods
burlington
bealls
sam's club
tj maxx / tjx
family dollar
five below
marshalls
ollie's
hobby lobby
college board
forever 21
whole foods
shoprite
ingles markets
trader joe's
goodreads
rite aid
badcock
barnes & noble
blockbuster
pet supermarket
auntie anne's
crumbl
wingstop
zaxby's
baskin-robbins
ben & jerry's
bruster's
haagen-dazs
menchie's
hardee's
five guys
krystal
jack in the box
steak 'n shake
sonic
white castle
taco bell
little caesars
captain d's
cheesecake factory
chili's
cracker barrel
golden corral
hard rock
o'charley's
buffalo wild wings / bww
longhorn
outback
texas roadhouse
dave & buster's
lenovo
abercrombie
ancestry
dk
l'oréal
metro-goldwyn-mayer / mgm
nationwide
nissin
oceangate
price chopper
nesco
technicolor
roku
vkontakte / vk
hbo
skype
amtrak
7-eleven / 7-11 / seven-eleven
abc
acer
adidas
agricole
tupperware
vaio
ups
fandango
fedex
holden
opel
vauxhall
stetson
nascar
petsmart
petco
linux
cadillac
renault
asda
dreamworks
rockstar
skechers
axios
betty crocker
universal
nasa
bluesky
under armour
wwf / world wildlife fund
waymo
boeing
gregg's
tinder
downy
abcya
sainsbury's
fritolay / lays
funko
aldi
github
alibaba
allianz
mazda
asics
timberland
puma
new balance
vans
birkenstock
rivian
nfl
waffle house
hewlett-packard / hp
duolingo
amazon
amd
dodge
twitch
american express
anheuser-busch / busch
anthropic / claude
apple "former apple CEO Steve Jobs would only eat apples and carrots for weeks at a time"
arby's
astrazeneca
asus
at&t / att / atnt
logitech
kleenex
dropout
arxiv
illumination
prada
publix
bojangles
goodyear
new york times / nyt
whataburger
shake shack
atlus
airbnb
xfinity
dunkin'
espn
atari
audi
audible
axa
b&h / bhp
backbone
bank of america / bofa
bbc
cbs
cnbc
berkshire hathaway
bic
bmo
bmw
bnp
bp
broadcom
buc-ee's
viacom
volvo
lamborghini / lambo
chanel
levi's
schnucks
yamaha
bugatti
burger king / bk
byd
cadbury
campbell's / campbell's soup
canon
canonical / ubuntu
casio
chevrolet / chevy
chevron
china mobile
chipotle
chiquita
chuck e. cheese
cisco
citigroup
cnn
cnooc
coca cola
colgate
comcast
commonwealth
costco
crayola
cvs
dairy queen
del monte
dell
discord "we have one! **discord.gg/R74n**"
disney / buena vista
dole
dollar general
dollar tree
domino's
doordash
ea / origin / maxis
cartoon network
stüssy
ulta
aniplex
crunchyroll
crowdin
sephora
elevance
eli lilly
enel
enron
expo
exxonmobil / mobil / exxon
fandom / wikia / imdb
epic games / epic
funimation
quora
porsche
ferrari
cd projekt red
temu
ebay
u-haul
safeway
vanguard
olive garden
pizza hut
raising cane's
chick-fil-a
ingles
fidelty
panera
amc
ticketmaster
norton
mcafee
general motors / gm
spirit airlines / spirit
american airlines
hilton
michaels
versace
united airlines / united
jersey mike's
patagonia
shein
geico
fruit of the loom
southwest airlines
sirius xm
state farm "like a good neighbor"
liberty mutual "liberty liberty liberty"
pbs
studio ghibli / ghibli
activision / blizzard
linkedin
namco
toys"r"us / toys r us
fifa
fox
fujifilm
game freak
gamestop
general mills
goldman sachs
google / alphabet
gucci
haribo
hdfc
heineken
hermes
hershey
home depot
hsbc
huawei
ibm
icbc
ikea
instagram / ig "follow us on instagram @R74ndev!"
whatsapp
intel
intesa sanpaolo
johnson & johnson / j&j
jpmorganchase / jpmorgan / chase
kellogg / kellanova
kfc
kia
kodak
konami
kraft / heinz
krispy kreme
kroger
lipton
louis vuitton / lvmh
lowe's
macy's
mars
marvel
mastercard
mcdonald's / wcdonald's / maccy d's / macca's / mickey d's / mcd's
wikimedia / mediawiki / wikipedia
transifex / indifex
panda express
landfall
lockheed martin / lockheed
hallmark
lindt
carnival
mercedes-benz / mercedes
meta / facebook
micro center
micron
microsoft / microslop "more like microSLOP!"
bing
msi / micro-star
lg
hulu
tubi
bethesda
hasbro
mattel
duckduckgo
ihop
buzzfeed
mitsubishi
mizuho
mojang
mondelez
morgan stanley
motorola
mozilla / firefox
nba
nbc
nestlé
netflix
niantic
nickelodeon
nike
nikon
nintendo
nokia
nothing
novartis
nvidia
oceana
oneplus
openai
oracle
palantir
panasonic
paypal
peacock / paramount
pepsico / pepsi
petrobras
petrochina
pfizer
pinduoduo
pinterest
pixar
popcap / capcom
procter & gamble / procter and gamble
progressive
psbc
razer
rbc
red bull
reddit "share this on R/74n!"
reebok
reliance
rio tinto
roblox
roche
rtx
samsung
sandisk
santander
saudi aramco
scholastic
sega
sharpie
shell
siemens
sinopec
snapchat
blue origin
sony
spacex / x
spotify
staples
starbucks
stripe
subway
sumitomo mitsui
supercell
taiwan semiconductor / tsmc
target
td bank / td
telegram
tencent
tesco
tesla "tesla was founded by Martin Eberhard and Marc Tarpenning"
the north face
tiktok / bytedance / capcut "follow us on tiktok @R74n.com!"
toyota
tumblr
twitter "follow us on twitter @R74nCom!"
ubisoft
ubs
unilever
unitedhealth
valve
verizon
visa
volkswagen / vw
walgreens
walmart
warner bros / warner / warner brothers / discovery
wells fargo
wendy's
xiaomi
yahoo
youtube


[oceans]
pacific
atlantic
indian / indic
antarctic / southern / south
arctic

[continents]
africa / african
americas / american
antarctica / antarctic
asia / asian
australia / oceania
europe / european
north america / north american
south america / south american
eurasia

[government]
= governmental / national / governence
alliance / union / treaty
anarchy / anarchist
aristocracy / aristocrat / aristocratic
authoritarianism / authoritarian
border
representative / MP
abolishment
bureaucracy / bureaucrat / bureaucratic
capitalism / capitalist
veto
serfdom
corporatocracy
liberalism / liberal
conservatism / conservative
ideology / ideological / ideologic
empire
ecclesiocracy
capital / capitol
war
ceasefire
centrism / centrist
economy / economic
court / judicial / judiciary
lawmaker
judge
healthcare
socialization / socialized
subsidy / subsidization / subsidize
colony / colonial / colonist
communism / communist / commie / tankie
confederation / confederate / confederacy
constitution / constitutional
democracy / democratic
democrat
despotism / despot
dictatorship / dictator / totalitarianism / totalitarian
distributism
election / voting / voter / elected / elect
jury / juror
fascism / fascist "this is bad, actually"
feudalism / feudal
imperialism / imperial / imperialist
kleptocracy / kleptocratic
law / legal / bill
ergatocracy
federalism / federalist
geniocracy
gerontocracy
kakistocracy
logocracy
meritocracy
plutocracy / plutarchy
poll
policy
minister / ministry
district
cabinet
administration / presidency
citizen
sovereignty / sovereign
backbencher
left wing / leftist / leftism
legislature / body
libertarian / libertarianism
military / army / navy / forces
monarchy / monarch
nationalism / nationalist / nation
nazism / nazi
oligarchy
parliament / parliamentary
president / presidential
prime minister
republic / republicanism
republican
right wing
socialism / socialist
state / statism / estatism
supreme leader
technocracy / technocratic
theocracy / theocratic
tribe / tribalism / tribal
dynasty
congress
territory
council
senate
absolutism / absolutist
protectorate
emirate
autocracy / autocratic
defendant
plaintiff
prosecutor
marxism / marxist / marx
bolshevism / bolshevik
utopia
federation / federal
matriarchy
patriarchy

[countries]
"to make everyone happy, we are using the loosest definition of **country**"
abkhazia
afghanistan
albania
rome / roman empire
algeria "in the 1850s, the US army imported camels from ^"
american samoa
curaçao
andorra
sint maarten
saint martin / collectivity of saint martin
cayman islands
mayotte
caribbean netherlands / bonaire / sint eustatius / saba
clipperton island / clipperton
åland / åland islands
babylonia / babylon
assyria
molossia
us virgin islands / virgin islands
british virgin islands / uk virgin islands
pitcairn islands
saint helena, ascension, and tristan da cunha / saint helena / ascension / tristan da cunha
angola
saint pierre and miquelon
anguilla
antigua and barbuda / antigua / barbuda
argentina "although argentina is famous for soccer, its national sport is **pato**"
armenia
aruba
australia / au / aus "australia is wider than the moon, at 4000 kilometers from east to west"
czechoslovakia
austria / austrian empire
prussia
azerbaijan
bahamas
bahrain
bangladesh
barbados
belarus
belgium
belize
benin
bermuda
bhutan
bolivia
bosnia and herzegovina / bosnia / herzegovina
botswana
bouvet island
brazil "the country was named after the tree, named after the nut"
brunei
bulgaria
sealand
burkina faso
burma / myanmar
burundi
cambodia
cameroon
canada "the canadian government designated santa claus an official postal code: **HOH OHO**"
cape verde / cabo verde
central african republic
chad
chile "its atacama desert is so barren that NASA uses it to test mars rovers"
china / prc / zhong guo "despite being about the width of the US, china has only one time zone"
colombia
comoros
congo / drc / democratic republic of the congo
cook islands
costa rica
côte d'ivoire / ivory coast
croatia
cuba
cyprus
czech republic / czech / czechia
denmark
djibouti
dominica
dominican republic / dominican rep
ecuador "due to the earth's bulge, mount chimborazo in ecuador is the closest point to space"
egypt
el salvador
england "gloucestershire hosts an annual **cheese** rolling competition, where people roll wheels of cheese down a hill"
northern ireland
equatorial guinea
eritrea
estonia
eswatini / swaziland
ethiopia
european union / eu
falkland islands / islas malvinas / falkland
faroe islands / faeroes / faroes
fiji
finland "according to the **World Happiness Report**, this is the happiest country"
france
french polynesia / tahiti
gabon
gambia
georgia
germany
ghana
gibraltar
greece
greenland
grenada
guadeloupe
guam
guatemala
guernsey
guinea
guinea-bissau
guyana
haiti
honduras
hong kong / hk
réunion
svalbard
hungary / magyar
iceland "iceland has no standing army"
india / bharat "^ is credited as the birthplace of chess, shampoo, and the concept of 0"
indonesia
iran / persia "although **Tehran** is the current capital, ^ has had as many as 54 national capitals"
iraq
ireland / éire "the only country to have an instrument - the celtic harp - as its national symbol"
israel
italy
jamaica
japan
jersey
jordan
kazakhstan "^ is the world's leading uranium producer, contributing to around 40% of global output"
kenya
kiribati "the first country to celebrate each new year"
kosovo
kuwait
kyrgyzstan
laos
latvia
lebanon
lesotho
liberia
libya
liechtenstein
lithuania
luxembourg
macau / macao
macedonia / fyrom / north macedonia
madagascar
malawi
malaysia
maldives
mali
malta
marshall islands "most of their territory is water!"
martinique
mauritania
mauritius
mexico
micronesia
moldova
monaco "monaco is smaller than new york city's central park"
mongolia
montenegro
montserrat
morocco
mozambique
namibia
nauru / naoero
nepal
netherlands
new zealand / zealand / aotearoa "the first country to grant women the right to vote"
nicaragua
niger
nigeria
niue
north korea / dprk
northern cyprus
northern mariana islands
norway
oman
pakistan
palau "^'s capital has no permanent residents - only government buildings"
palestine / gaza strip
panama
papua new guinea "they have about 800 languages - that's 12% of languages worldwide"
paraguay
peru
philippines
poland "lost landmines were found in a polish **ikea** warehouse in 2025"
portugal
puerto rico
qatar
republic of the congo / congo republic
romania
russia "the trans-siberian railway is the world's longest, crossing 8 time zones"
rwanda
saint kitts and nevis / saint kitts / nevis
saint lucia
saint vincent and the grenadines / saint vincent
samoa
san marino
são tomé and príncipe / sao tome and principe
saudi arabia
scotland "their national animal is the unicorn"
senegal
serbia
seychelles
sierra leone
singapore
slovakia
slovenia
solomon islands
somalia
somaliland
south africa
south korea / korea
south ossetia / ossetia / alania
south sudan
spain
sri lanka
sudan
suriname "suriname is the greenest country in the world, with over 95% of its land being rainforest"
sweden
switzerland "although usually neutral, ^ has accidentally attacked liechtenstein 5 times"
syria
taiwan
tajikistan
tanzania
thailand / siam
tibet
timor-leste / timor
togo
tokelau
tonga "the only remaining sovereign monarchy in oceania"
transnistria
trinidad and tobago / trinidad / tobago
tunisia
turkey / türkiye
turkmenistan
turks and caicos islands / turks and caicos / turks / caicos
liberland
tuvalu "much of this island nation's revenue comes from selling **.tv** domains"
uganda
ukraine
united arab emirates / uae
united kingdom / uk / britain / british / great britain / gb
united states / usa / us / america / 'murica / 'merica "despite popular belief, the US is only one of many countries"
uruguay
ussr / soviet union
yugoslavia
uzbekistan
vanuatu
vatican city / vatican / holy see
venezuela "^ is home to **angel falls**, the highest undisturbed waterfall in the world"
vietnam / 'nam
wales "the UK's coins are all minted in the town of llantrisant"
western sahara / sahrawi
yemen
zambia
zimbabwe

[US states]
Alabama / AL
Alaska / AK
Arizona / AZ
Arkansas / AR
California / CA
Colorado / CO
Connecticut / CT
Delaware / DE
Florida / FL
Georgia / GA
Hawaii / HI / Hawai'i
Idaho / ID
Illinois / IL
Indiana / IN
Iowa / IA
Kansas / KS
Kentucky / KY
Louisiana / LA
Maine / ME "the only state with a one-syllable name"
Maryland / MD
Massachusetts / MA
Michigan / MI
Minnesota / MN
Mississippi / MS
Missouri / MO
Montana / MT
Nebraska / NE
Nevada / NV
New Hampshire / NH
New Jersey / NJ
New Mexico / NM
New York / NY
North Carolina / NC
North Dakota / ND
Ohio / OH
Oklahoma / OK
Oregon / OR
Pennsylvania / PA
Rhode Island / RI
South Carolina / SC
South Dakota / SD
Tennessee / TN
Texas / TX
Utah / UT
Vermont / VT
Virginia / VA
Washington / WA
West Virginia / WV
Wisconsin / WI
Wyoming / WY

[canadian provinces]
"...and territories"
alberta
british columbia
manitoba
new brunswick
newfoundland and labrador
northwest territories
nova scotia
nunavut
ontario
prince edward island
quebec
saskatchewan
yukon

[australian states]
"...and territories"
New South Wales
Victoria
Queensland
Western Australia
South Australia
Tasmania
Australian Capital Territory / Australian Capital
Northern Territory
Jervis Bay Territory / Jervis Bay
Norfolk Island
Christmas Island
Cocos (Keeling) Islands / Cocos Keeling
Australian Antarctic Territory / Antarctic Territory
Coral Sea Islands / Coral Sea
Ashmore and Cartier Islands / Ashmore / Cartier
Heard Island and McDonald Islands / Heard Island / McDonald

[english counties]
"*ceremonial"
bedfordshire
berkshire
bristol
buckinghamshire
cambridgeshire
cheshire
city of london
cornwall
cumbria
derbyshire
devon
dorset
durham
east riding of Yorkshire / east riding / east yorkshire
east sussex
essex
gloucestershire
greater london
greater manchester
hampshire
herefordshire
hertfordshire
isle of wight
kent
lancashire
leicestershire
lincolnshire
merseyside
norfolk
north yorkshire
northamptonshire
northumberland
nottinghamshire
oxfordshire
rutland
shropshire
somerset
south yorkshire
staffordshire
suffolk
surrey
tyne and wear
warwickshire
west midlands
west sussex
west yorkshire
wiltshire
worcestershire

[national capitals]
abu dhabi
abuja
plymouth
accra
addis ababa
aden
algiers
amman
amsterdam
andorra la vella
ankara
stanley
antananarivo
apia
ashgabat
asmara
astana
asunción
avarua
alofi
athens
baghdad
baku
bamako
bandar seri begawan
bangkok
bangui
banjul
basseterre
beijing
beirut
belfast
belgrade
belmopan
berlin
bern
bishkek
bissau
bloemfontein
bogotá
brasilia
bratislava
brazzaville
bridgetown
brussels
bucharest
budapest
buenos aires
cairo
canberra
cape town
caracas
cardiff
castries
chișinău
ciudad de la paz
colombo
conakry
copenhagen
dakar
damascus
dhaka
dili
djibouti
dodoma
doha
dublin
dushanbe
edinburgh
freetown
funafuti
gaborone
georgetown
gitega
guatemala city
hanoi
harare
hargeisa
havana
helsinki
honiara
islamabad
jakarta
jerusalem
juba
kabul
kampala
kathmandu
khartoum
kigali
kingston
kingstown
kinshasa
kuala lumpur
kuwait city
kyiv / kiev
la paz
laayoune
libreville
lilongwe
lima
lisbon / lisboa
ljubljana
lome
london
luanda
lusaka
luxembourg
madrid
majuro
malé
managua
manama
manila
maputo
maseru
mbabane
mexico city
minsk
mogadishu
monaco
monrovia
montevideo
moroni
moscow
muscat
n'djamena
nairobi
nassau
nay pyi taw
new delhi
ngerulmud
niamey
nicosia
nouakchott
nuku'alofa
nuuk
oslo
ottawa
ouagadougou
palikir
panama city
paramaribo
paris
phnom penh
podgorica
port au prince
port louis
port moresby
port of spain
port vila
porto novo
prague
praia
pretoria
pristina
pyongyang
quito
rabat
ramallah
reykjavik
riga
riyadh
rome
roseau
saint george's
saint john's
san jose
san marino
san salvador
sana'a
santiago
santo domingo
sao tome
sarajevo
seoul
singapore
skopje
sofia
sokhumi
sri jayawardenepura kotte / sri jayawardenapura kotte
stockholm
sucre
suva
taipei
tallinn
tarawa
tashkent
tbilisi
tegucigalpa
tehran
thimphu
tirana / tirane
tokyo
tripoli
tskhinvali
tunis
ulaanbaatar
vaduz
valletta
vatican city
victoria
vienna
vientiane
vilnius
warsaw
washington, d.c. / dc / d.c. / washington / district of columbia
wellington
windhoek
yamoussoukro
yaounde
yerevan
zagreb

[state capitals]
albany
annapolis
atlanta
augusta
austin
baton rouge
bismarck
boise
boston
carson city / carson
charleston
cheyenne
columbia
columbus
concord
denver
des moines
dover
frankfort
harrisburg
hartford
helena
honolulu
indianapolis
jackson
jefferson city / jefferson
juneau
lansing
lincoln
little rock
madison
montgomery
montpelier
nashville
oklahoma city
olympia
phoenix
pierre
providence
raleigh
richmond
sacramento
salem
salt lake city / salt lake
santa fe
springfield
st. paul
tallahassee
topeka
trenton

[languages]
'are'are
abkhaz
aboriginal
achinese / acehnese
acholi / acoli
afar
afrikaans
aghul
ainu
elfdalian
ket
dakota / dakhóta
akan
pontic
venetic
messapic
dacian
thracian
karluk
oghuz
võro-seto / south estonian
aromanian
mansi
khanty
sámi
circassian / cherkess / adyghe
moksha
karelian
kashubian / cassubians / kashubs
slavonic
griko / grico
latgalian
samogitian
nenets
nakh
tuvan
lepcha
yakut / sakha
tulu
tausūg
santali
nagpuri / sadri
meitei
akkadian
alabama
albanian
aleut
algerian arabic
altai
amami
amharic
andalusi romance / mozarabic
arabic
aragonese
aramaic
armenian
ashanti / asante twi
asl / american sign language / sign language
assamese
assyrian
asturian
aui
aurebesh
auslan
avar / andic
awadhi
aymara
azerbaijani / azeri
bahasa indonesia / indonesian / bahasa
bahnar
balinese
balochi
bambara
bashkir
basque
bavarian
belarusian
bemba
bengali
berber / tamazight / amazigh
bhojpuri
blackfoot
bokmål / norwegian
bosnian
braille
breton
bsl / british sign language
bulgarian
bunurong / boonwurrung
burmese
burushaski
cambodian / khmer
cameroonian / cameroonian pidgin / cameroonian pidgin english / cameroonian creole / kamtok
cantonese / yue
cape verdean / portuguese creole
castillian
catalan
cebuano / bisaya
chaldean
chamorro
chaozhou
chechen
cherokee
chichewa
chin / laiholh / hakha
chittagonian
choctaw
chuukese / trukese
chuvash
cia-cia / butonese / south buton
coptic
cornish
corsican
cree
creole
crimean tatar
croatian
cuneiform
czech
dalmatian / dalmatic
damin
danish
dargwa / dargin
dari
darug
dene
dewoin
dharug
dinka
dogri
donbe
dothraki
duala
dungan
dutch
dzongkha
egyptian / hieroglyphics / hieroglyphs
elamite
english "the most spoken language globally"
esperanto "saluton!"
estonian
etruscan
even
evenki
ewe
fante
faroese
farsi / persian
fiji hindi
fijian
filipino / tagalog
finnish
flemish
french / canadian
frisian
friulian
fukienese
fulani / fulfulde / fula
fuzhou
fuzhounese
ga
gaelic / scottish
gagauz
galician
gallo
gan
genoese
georgian
german
gibberish
gilbertese
gokana / khana
greek
greenlandic
guarani
gubbi gubbi / kabi kabi
guernésiais
gujarati
haitian creole / haitian
haka burmese
hakka
halacae "cehoo-ae yesaeha!"
haryanvi
hausa
hawaiian
hawaiian pidgin / hawaiian creole / hawai'i creole english
hebrew
hindi
hittite
hmong
hokkien
hungarian
hunsrik
ibo / igbo
icelandic
ido
ilocano / iloco / iloko
interlingue / interlingua
inuit
inuktitut
iñupiat
irish
italian
ithkuil
iwaidja
jamaican patois / jamaican / patois
japanese
jarai
javanese
jeju / jejueo / jejuan
jerriais
jin
kabiye
kalapuya
kalaw lagaw ya
kalmyk / oirat
kannada
kanuri
kapampangan
karakalpak
karen / pa'o / s'gaw
kashmiri
kayah
kazakh
keres / keresan
khoe
khoekhoe
kinyarwanda
kirundi
kituba
klamath
klingon
koho
kokanu
komi
korean / hangul
kosraean
kpele
krahn
krio
kumyk
kunama
kunigami
kurdish / kurmanji / sorani
kusunda
kwara'ae
kwikwetlem / halkomelem
kyrgyz
ladin
ladino / judaeo-spanish / judezmo / sephardi / spaniolit
lak
lakota
lao
latin
latji-latji
latvian
laz
lezgin / lezgic / lezgi
ligurian
limburgish
lingala
lithuanian
loglan
lojban
lombard
luba-kasai
luganda
luo
lushootseed
luxembourgish
maa
maay / af maay / rahanween / bantu
macedonian
madurese
magahi
maithili
malagasy
malay
malayalam / malaylam
malinke
maltese
mam
mandarin / chinese "the second most spoken language globally"
mandinka / mandingo
manx
maori
marathi
margaluri
marshallese
mayan / akateko / kanjobal / q'anjob'al
miami-illinois / wabash / myaamiaataweenki
mien
min nan
mina / gen
minangkabau
ming-deng-ngu
mingrelian
minoan / linear a
mixteco alto
mixteco bajo
miyako
mnong
monegasque
mongolian / mongol
montenegrin
moriori
moroccan arabic
muscogee
na'vi
nahuatl
nauruan
navajo
ndebele
ndombe
nepalese
nepali
ngunnawal
nheengatu
nigerian pidgin
nihali
niuean
nko
nogai
norman
norse
nuer
nukuoro
nuxalk
nynorsk
occitan
odia / oriya
ojibwe
okinawan
oromo
osage
ossetian
palauan
palawa kani
palestinian arabic
pali
pangasinan
papiamento
pashto / pushto
picard
pidgin
piraha
pirahã
polabian
polish
pomeranian
portuguese
prakrit
proto-indo-european / pie
proto-uralic
prussian
pulaar
punjabi / panjabi
qashqai
quechua
kichwa
mixtec
buryat
formosan
hiligaynon
quenya
quiche / k'iche
rade
rapa nui
ripuarian
rohingya
romani
romanian
romansh
rotokas
russian
rusyn
rutul
sahaptin / ichishkiin
samoan
san miguel
sanskrit
santa eulalia
saraiki
sardinian
scots / doric
otomi
wayuu
q'eqchi'
scouse
serbian
serbo-croatian
serer
seychellois creole / seychellois
shanghainese
shona
sichuan / szechuan
sicilian
silesian
sindarin
sindhi
sinhala
sinhalese
sioux / siouan
slovak
slovene
slovenian
solresol
somali
soninke / serahule
sorbian
sotho
spanish / mexican / español
sumerian
sundanese
susu
svan
swahili
swedish / svenska
syriac
taa
tabasaran
tahitian
tai dam / shan / tai
taiwanese
tajik
tamboran
tamil
tat
tatar
telugu
thai
tibetan
tigre
tigrigna / tigrinya
toishanese
tok pisin
tokelauan
toki pona "kama pona!"
tongan
trinidadian creole / trinidadian
tsakhur
tswana
turkish
turkmen
tuvaluan
twi
tzotzil
ubykh
ukrainian
urdu
uyghur
uzbek
valyrian
venetian
vietnamese / viet
volapük
vötgil "hey!"
vulcan
walloon
waray
welsh
wiradjuri
woiwurrung / woiwurrong / woiworung / wuywurung
wolof
wu
xhosa
xiang
xibe
yaeyama
yapese
yi
yiddish
yonaguni
yoruba
yucatec maya
yup'ik
zapotec
zarma
zhuang
zulu

[computer languages]
= programming languages / scripting languages
.net / dotnet
a+
abap
actionscript
ada
apl
applescript
assembly
b
bash
basic
batch / dos / ms-dos
brainfuck
c
whitespace
mips
c##
c++
caml
cfml
clojure
cobol
css
d
dart
delphi / object pascal
erlang
fortran
gml
go / golang
haskell
html
java
javascript / js
json
julia
kotlin
labview
ladder logic
latex / tex
lisp
lua
matlab
ml
nim
objective-c
ocaml
pascal
perl
php
pl//sql
powershell
prolog
python / py
r
ruby
rust
sas
scala
scratch
smalltalk
sql
swift
transact-sql
typescript / ts
visual basic / vb / vbscript
x++
xml
yaml
zig
dreamberd / gulf of mexico

[religions]
= beliefs
agnosticism / agnostic
anglicanism / anglican
atheism / atheist
bahá'í / baháí
baptist
buddhism
calvinism
shamanism
vaishnavism
cao dai
khabzeism
scientology / scientologist
secularism / secular
catholicism / catholic
christianity / christian
confucianism / ru / ruism
confuscianism / confuscian
coptic
gnosticism / gnostic
heathenism
heaven's gate
hellenism
hinduism / hindu
islam / muslim
jainism / jain
jehova's witnesses
judaism / jewish / jew
kemetism
lutheranism / lutheran
monotheism / monotheist
mormonism / mormon
neopaganism
occultism / occult
orthodox
paganism / pagan
pastafarianism / pastafarian / flying spaghetii monster
polytheism / polytheist
theism / theist
presbyterianism / presbyterian
protestantism / protestant
rastafarianism / rastafari
satanism / satanic
shiism / shia
shinto
sikhism / sikh
society of friends / quaker
spiritism
sufism / sufi
sunnism / sunni
taoism / daoism
tenrikyo
thelema
unitarianism / unitarian
vodou / voodoo / vaudou / vodun / vodoun / vodu / vaudoux
wicca
zoroastrianism

[common names]
= names / first names
aaron
abigail / abby / abbie
abraham
adam
addison / addy / adeline
amir / ameer / emir
adhara
adrian / adriana
agatha / agata
aiden / aidan / ayden
ailany
alan / allen / allan / alanna / alana / alanah / alannah / ilana
albert / al / bert / elbert
alexander / alejandro / alex / alexandria / alexandra / alexis / alexei / alexa
alfred
alice / allison / alison / allie / ally / alis / alys / ali
alma
alyssa / alisa
amanda / amy
amber / ambar
amelia / emilia / emilio / emiliano / emil / emile
amos
ana / annie / anna / anne / an / anita / annette / anika / annika / ann / annabelle
andrew / andy / andie / andre / andrea / andrey / andreas
angela / angelo
anthony / antonio / antonella / tony
archie / archy
ariana / arianna / aria / ari / arya
arthur
ashley / lee / asher / ash
aspen
aubrey
audrey / audriana / audrianna
aurora
austin
ava
avery
ayla
bailey
barbara
barry
bartholomew / bart
beatrice
benício
benjamin / ben / benny / bennie
bentley
bernardo / bernard
bertha
bethany / beth
betty / betsy
beverly
bianca
blake
bradley / brad / brady
brandon
braxton
brenda
brett
brian / bryan / brianna / briana / breanna / bryanna / brianne / breanne
brittany / britney / brittney / brittani / brittanie or britnee
brody
brooklyn / brooke
bruce
bruno
caitlin / catelynn / caitlyn / katlyn / kaitlin / kaitlyn / kaitlyne / katelyn / katelynn
caleb / kaleb
cameron / cam / cammy
camila / camilla
candace
carl / karl / carlson / karlson / carlos / carlo / carly
carol / karol / carolyn / caroline / carolina
carter
catalina
catherine / katherine / kathy / kathie / kathleen / kathryn / kate / katie / kat / cate
cayden / cadan
cecilia / cecil
celeste / celestia
charles / charlie
charlotte
chelsea
cheryl
chester
chloe
christopher / chris / christ / christina / christine / christie / christy / tina
claire / clara / clarissa / clair
clarence
clark
clifford
clint
clyde
cody / kody
colleen
connor / conner
cooper
cora / coralina
courtney
cynthia
dallas
daniel / dan / danny / danielle / danni / dani / dannie / dana
david / davi / dave / daveed
deborah / debra / debbie / debby
delilah
denise
dennis
derek / derrek / derrick / derick
devin / devon
dewey
diane / diana / dianna
diego / diogo
donald / don / donnie / donny
donna
dora
dorothy
dory / dorie
douglas / doug
dylan
easton
edna / ednah
edward / ed / eddie / eddy / eduardo
edwin
eleanor / ellie / eliana / elly / el / ella / elle / nora / norah / nelly / nellie
elijah / eli
elizabeth / lizabeth / eliza / lisa / liz / lizz / lisha / elisa
elsie / elsa
emery
emma / emily
emmanuel / manuel
enzo
eric / ericson / erik / erick / erika
ethan
eugene / gene
evan
evelyn / eve / eva / evie
ezekiel
ezra
fatima / fatimah
felipe
felix
florence
francis / francesca / francesco / frank / frankie / franky / fran / françois / franklin / francine
frederick / fred / freddy / freddie
freya
gabriel / gabe
gabriela / gabriella / gabrielle / gabby
gary / garret / garrett / garry
gavin
george / georgia / jorge
gerald
giorno
giovanni / gio
gloria
gordon
grace / gracie / gracy
graham
grayson / greyson
gregory / greg
gustavo / gus
guy
gwen
haley / hailey
hannah / hanna
harper
harrison / harold / harry
hazel
heather
hector / hektor
heidi
heinrich / enrique
heitor / heiter
helen / helena / elena / alena
heloísa
henry / henrietta
hubert
hudson
hugo
hunter
ian
ingrid
isaac / izak
isabella / isabela / izzy / bella / belle / isabelle / isabel
isaiah / isaias
isla
ivan / ivanka / ivana
ivy
jack / jackie / jacky / jacques / jacqueline
jacob / jakob / jake
jaiden / jayden / jay
james / jim / jimmy / jamie / jameson / jimbo
janet
janice
jason / jase / jace
jeffrey / jeff / geoff / geoffrey
jennifer / jenny / jennie / jenna / jen
jeremiah / jeremy
jerome / jerónimo / jerry
jesse / jessie / jessica / jess
joaquin / joachim
jocelyn
joel / yoel
jonathon / jonathan / john / johnny / joan / juan / johanna / joanna / joanne / jean / jeanne / jana / jo / jane / jehanne / jolene / jon / jone / jones / jonesy / jonny / johnson
jordan / jorden
jose
phineas
finn / finlay
joseph / joe / josephine / jody
joshua / josh
joyce
judas / jude / judah / judith / judy / judie
julia / juliet / julieta / julio / julian / juliana / julie
justin
karen
kayleigh / kaylee / kayla / kay
keith
kelly
kelsey
kenneth / kenny / ken
kevin
kiara / ciara / kiera / keira
kimberly / kim
kurt
kyle / kylie
landon
larry
laura / lauren / lori / lorraine / lara
lawrence
layla
leah
leonard / leonardo / leo / leon / leonel
levi
liam
lily / lilly / lilian / lillian / lilith
linda
lindsay / lindsey / linsey
linus
logan
lola
lorenzo
louis / lewis / louise / louie / lou / lois
lucas / luke / luca / luka
luciana / lucia
lucinda / lucy / cindy
luigi
lynn
mackenzie / mckenzie / mack
maddox / madoc
madison / maddie / maddy / madeline
maeve
maitê
malcolm / malcom
marcus / markus / mark / marc / marco
margaret / maggie / greta
maria / marie / mary / marilyn / mariah
mario
martha
martin / martina / marty
mason
matthew / matt / matteo / mateo / matías / teo
maverick / maveric
megan / meagan / meg / meghan
melanie / mel
melissa
mia
michael / mike / michaela / makayla / mika / micah / miguel / michelle
mickey
mila
miles
mitchell / mitchel / mitch
molly
monica / monika / monique / mona
muhammad / mohamet / mohammed / mahamad / muhamad / mohamed / ahmad / ahmed / ahmmad / mo / moe / mahmoud
nadia / nadya / nadine
nancy
naomi
natalie / nat / natalia / natasha
nathan / nathaniel / nate
ness
nevaeh
nicholas / nick / nicky / nickie / nikki / nicolas / nicole / nichole / colin / collin / cole
nigel
noah
noel / noelle
nolan
oakley
olaf
olivia / oliver / ollie
ophelia / ofelia
otto
owen / eoin
paige
paisley
pamela / pam
patrick / pat / patricia / pattie / patty
paul / pauline / polly / paula
penelope / penny
percy
perry
peter / pete / pierre / pedro
philip / phillip / phil / filip / fhilipe
piper
poppy
quinn
rachel
raegan
ralph / raul / rudolph
randy / randall
ravi
raymond / ray
rebecca / becky / becca
reese
regina
richard / rich / richie / richy / dick / rick / ricky / rickie / richelle / richele
riley
rita
robert / rob / bobby / bob / robbie / robby
roderick / rodrick / roderic / roddy
roger
roman / romeo
romina
ronald / ron / ronnie / ronny
rosie / rosa / rosemary / roosevelt
ruth
ryan
ryker / riker
sabrina / bree / bri
salvador
samuel / samantha / sam / sammy
sandra / cassandra / sandy / sasha / sascha
sarah / sara / sally / sallie
saul
savannah / savanna
scarlett / scarlet
scott / scottie / scotty
sebastian / seb
sharon
shawn / sean / shaun
shelby
shirley
sienna
sierra
simon / simone
solomon
sophia / sofia / sophie / sofie
spencer
stacy / stacie
stanley / stan
stella
steven / stephen / steve / stevie / stephanie / stefanie
stuart / stewart / stewie / stu
susan / sussan / sussanne / suzanne / susie / suzy / suzie
sydney
sylvie / sylvia
tamara / tammy / tammie / tam
tatiana / tanya
tatum
taylor
teresa / theresa / terry / tessa / tess
dante / durante
chandler
ross / joss
theodore / theo / ted / teddy
thiago / tiago / santiago
thomas / tom / tommy
tiffany / tiff
timothy / timothee / tim / timmy
tobias / toby / tobey
tracy
trevor
tyler / ty / tyreese
tyrone
valentino / valentine / valentina / valentin
valeria
vanessa
vega
victoria / vicky / vick / victor / viktor / vic
vincent / vince
violet
vivian
walter / walt
wayne
wendy
weston
william / will / bill / billy / willie / willow / willy / wilson
wyatt
xavier / javier
yusuf / yousef / yousif / youssef / youssif / yousuf / yoosuf / yusef
yves / yvette
zachary / zach / zack
zoe / zoey

[money]
= currency / cash / coin / bill / banknote / dinero / currencies / change / dinero / moolah
afghani
apsar
ariary
baht
balboa
akşa
toonie / twonie / twoonie
robux / tix
birr
markka
kopeck / kopek
grosz
doubloon
drachma
jiao / mao
fen
bolívar
boliviano
cedi
cent / penny / ¢
colón
bitcoin / btc
ethereum
dogecoin
córdoba
dalasi
denar
dinar
dirham
dobra
dollar / $
đồng
dram
kuruş / gurush / ersh / gersh / grush / grosha / grosi / piastre / piaster
escudo
euro / €
florin
forint
franc
gold
oil
gourde
guaraní
guilder
hryvnia
kina
kip
koruna
króna / krona / kronor / sek
krone / kroner
loonie / huard
kwacha
kwanza
lev
hyperpyron
solidus
nomisma
kuna
rentenmark
tenner
fiver
kyat
lari
lek
lempira
leone
leu
lilangeni
lira
loti
manat
mark
metical
naira
nakfa
ngultrum
ouguiya
pa'anga
pataca
peseta
pence
peso
pound / pound sterling / quid / £
pula
quetzal
rand
real / reais
centavo
renminbi / yuan / rmb
rial
riel
ringgit
riyal
ruble
rufiyaa
rupee
rupiah
shekel
shilling
sol
som
somoni
sterling
sum
taka
tālā
tenge
tögrög
vatu
won / jeon
sixpence / tanner
yen / ¥
złoty / zloty
nickel
quarter
dime "this coin has exactly 118 ridges around its edge"

[jobs]
= occupations / workers / laborers / labourers / positions / employment / employee / staff / faculty / professions
accountant
ace
acrobat
activist
actor / actress
haberdasher
acupuncturist
bandit
administrator / admin
admiral
dungeon master / dm
rider / cavalry
mufti
magistrate
theorist
line cook
cadet
fashionista
juror / jury
expert
human resources / hr
public relations / pr
endocrinologist
bellhop / porter / bellboy
algebraist
blogger
baller / basketballer
physiotherapist / physical therapist / pt
interviewer
scribe
cantor / chanter
pioneer
customer service
advisor
aedile
polymath
exorcist
criminal
aesthetician
impersonator / impressionist
swimmer
hitman / assassin
shooter / marksman
missionary
traveler / traveller
archer
apprentice
scooper
leader
authority
agent
air traffic controller / atc
alchemist
animator
anthropologist
archbishop
archduchess / archduke
architect
aristocrat
arsonist
artificer
artist / creative
assemblyperson / assemblyman / assemblywoman
assistant
astronaut / cosmonaut / taikonaut / spationaut / vyomanaut "most countries with a space program have their own name for ^s"
astronomer
athlete / player
attendant
squire / esquire
toymaker
tiller / setter
mercenary
attorney
auctioneer
auditor
author / writer
aviator
babysitter / sitter / nanny
stripper
baker
ballerina
banker / teller
bard
barista
baron / baroness
bartender / barkeep / mixologist
bassist
beekeeper
beggar / vagabond / hobo
biologist
bishop
trapper
jeweler
blacksmith
bodybuilder
bodyguard
boss / employer
botanist
bouncer
boxer
breeder
brigadier
ornithologist
pâtissier
silversmith
theologian
broadcaster
builder / construction worker / construction
businessman / businessperson / businesswoman
busker / street performer
butcher
butler
caddy
caliph
cameraperson / cameraman / camerawoman
captain
cardinal
cardiologist
caretaker / carer
carpenter
cartographer / mapmaker
cartoonist
cashier / clerk / shopkeeper
serf / peasant
celebrity / superstar / popstar
elite
restaurateur / restauranter
veteran
footballer
accordionist
baseman
ceo
cfo
chaplain
chef / cook
chemist
chief / chieftain / chieftess
chiropractor
cleaner
cleric / clergy
archeologist / archaeologist
goalie
flutist / flautist
parkourist
client
clown
cna
coach
cobbler
colonel
comedian / comic
commander
commissioner
conductor
congressperson / congressman / congresswoman
consort
consul
consultant
copilot
coroner
corporal
corsetmaker
cosmetologist / stylist
counselor / councilor
count / countess
cowboy / cowgirl
craftsman
critic
curator
dancer
deacon
dean
delivery
dentist
deputy
dermatologist
designer
detective / investigator
dietician
diplomat
director
diver
dj / disc jockey / disk jockey
doctor
dogsitter / petsitter / dog walker
driver / chauffeur
patriarch
druid
drummer
drycleaner
duce
duchess / duke
earl
ecologist
economist
editor / proofreader / copywriter
electrician
emir
emperor
empress
engineer
entertainer
eunuch
executioner / headsman
executive
explorer
exterminator
farmer / farmhand
farrier
fighter
firefighter / fireman / firewoman
fisher / fisherman / fisherwoman
florist
fortune teller / psychic / future teller / seer
freelancer
friar
gambler
game warden
gangster
garbage person / garbage man / garbage woman
gardener
gatherer
general
geographer
geologist
gladiator
golfer
goon
governor
gravedigger
griot
grocer
groomer
guard / security / guardian
guitarist
gymnast
gynecologist
hacker
hairdresser / barber
handyman
hatter
hauler
henchman
herbalist
hero / heroine
hierophant
historian
host
housekeeper
hunter
illustrator
imam
immunologist
infielder
influencer
innkeeper
inspector
intern
interpreter / translator
inventor
investor / entrepreneur
vigilante
analyst
violinist
confectioner / candymaker
gamemaster
lorekeeper
jailer / bailiff
janitor / custodian
jester / muse
jockey / horseback rider / horse rider / equestrian
logician
entomologist
joker
journalist
jouster
judge
judoka
juggler
kaiser
knight
landlord
landscaper
lawyer
let's-player
librarian / bookkeeper
lieutenant
lifeguard
linebacker
linguist
logger
lumberjack
machinist / machiner
magician
maid
mail carrier / mailman / mailperson / mailwoman / postman / postie
major
manager
mangaka / manga artist
marchioness / marquise
marine
marquess / marquis
marshal
masseuse / massage therapist
mathematician
mayor
mechanic / repairman / fixer
medic
mentor
messenger
metallurgy
meteorologist / weatherman / weatherwoman / weatherperson / weatherboy
midwife
milkman / milk deliverer
mime
miner
minion
mobster / mafioso
model
moderator / mod
monarch / queen / king / ruler
monk
mortician / undertaker
musician
necromancer
pyromancer
mascot
nephrologist
newscaster / reporter
ninja
nun
nurse
nutritionist
obstetrician
olympian
oncologist
ophthamologist
optician
optometrist / eye doctor
oracle
organist
orthodontist
outfielder
painter
paladin
paleontologist / palaeontologist
paperboy
paralegal
paramedic
parole officer
rescuer / searcher
shaman
ticket taker
scalper
dropshipper
scorekeeper
pawn
pediatrician
peon
performer
pharaoh
pharmacist
philosopher
photographer
physician
physicist
pianist
pilot
pimp
pirate
pitcher
planner
plumber
docker / longshoreman
barbarian
viking
poet / poetess
police / cop / policeman / policewoman / officer / popo
politician / lawmaker
pope / pontifex maximus / popess
potter
praetor
preacher
president
priest / pastor / priestess
prince / princess
princeps
principal
prisoner
private
privateer
producer
professor / teacher / instructor
owner
chairman / chairwoman / chairperson / foreman
geneticist
locksmith
climber / mountaineer
midshipman
publisher
programmer / developer / dev / coder / gamedev / geek / nerd
prosecutor
prospector
prostitute / hooker / escort
psychiatrist
psychologist
puppeteer
quarterback
rabbi
radiologist
rancher
ranger
rapper
realtor
reaper
receptionist
referee / ref
representative
announcer / presenter
researcher
ringleader
rockstar
rogue
royal
sailor
saint
sales / salesman / saleswoman / salesperson / seller
samurai
scientist
scout
scriptwriter / playwright / screenwriter
sculptor
secretary
senator
sergeant
servant
server / waiter / waitress / waitstaff
sheriff
shogun
singer / vocalist
broker / dealer
prophet
guide
emt / medical technician
ventriloquist
magnate
hygienist
slave
smith
soldier / military
sommelier / chef de vin / wine steward
songwriter / composer / lyricist
sorcerer / sorceress / witch / wizard / warlock / mage / enchanter / enchantress
spy
stenographer
steward
stonemason / mason
storyteller
streamer / livestreamer
student
superhero
supervillain
surgeon
tactician
tailor / seamstress / dressmaker
tanner
taxonomist
technician
terrorist
therapist / shrink
trader / merchant / tradie / tradesman
trainer
trucker
trumpeter
tsar / czar
tutor
typist
umpire
vlogger
cyclist
unemployed
urologist
usher
valet
vet / veterinarian
viceroy
videographer / cinematographer
villain
virologist
vtuber
warden
warrior
welder
wrestler
youtuber / content creator / creator
zookeeper
zoologist

[family]
= relatives / relationships / household
adult
aunt / aunty / auntie
baby
boyfriend / bf
brother / bro / fraternal
brother-in-law
child / kid / children / adolescent / minor / offspring / descendant
heir
male / boy / man / guy / dude / lad
female / girl / woman / dudette / gal
child-in-law
cousin
neighbor
toddler / tot
dad / father / papa / pa / daddy / dada / paternal / baba / da / papi
daughter
daughter-in-law
enbyfriend
ex
acquaintance / peer
pregnant / pregnancy
father-in-law
fiancé
fiancée
bride
groom
soulmate
ancestor
bachelor / bachelorette
engaged / fianxé
firstborn / eldest
friend / colleague / buddy / pal / chum
girlfriend / gf
grandchild / grandchildren / grandkid
granddaughter
grandfather / grandpa / granddad / gramps
grandmother / grandma / granny / gran / grandmom / nana / nan / nanna / nona / nonna / meemaw
grandparent / elder
grandson
half-brother
half-sibling
half-sister
husband / hubby / husbando
kin
in-law
mom / mother / mama / ma / mommy / momma / mum / mami / maternal
mother-in-law
nephew
nibling / pibling
niece
parent
partner / mate / datemate / theyfriend / joyfriend / darling
pet
quadruplet
quintuplet
septuplet
sextuplet
octuplet
nonuplet
decuplet
sibling / sib
sister / sis / sororal
sister-in-law
son
son-in-law
spouse
step-brother / step-bro
step-child / step-children
step-daughter
step-sibling
step-sister / step-sis
step-son
stepdad / stepfather
stepmom / stepmother / stepmum
step-parent
step-cousin
godfather
godmother
godparent
teenager / teen
triplet
tweenager / tween
twin
uncle
wife / wifey / waifu
middle child
youngest
bff
best friend
nanny
adoptee

[space]
= cosmos
& celestial bodies
& constellations
meteor / asteroid / meteoroid / meteorite / fireball
comet
ring
protoplanetary disc
solar system / star system
sky
nebula / nebulae
black hole
white hole
stardust
orbit
wormhole
supernova
hypernova
time
rover / probe
quasar
magnetar
universe
multiverse
galaxy
milky way
andromeda
sunset
solstice
equinox
eclipse
sunrise
sputnik
spaceship / rocket
ufo / uap
neutron star
white dwarf / dwarf
red dwarf
alien / extraterrestrial / et
giant / supergiant
hypergiant
void
cosmic filament
supercluster
asteroid belt / belt
heliosphere
oort cloud

[celestial bodies]
= solar system
& planets
aldebaran
arcturus
ariel
betelgeuse
callisto
ceres
charon
deedee
deimos
dia
amalthea
enceladus
eris
euporie
europa
despina
larissa
thalassa
galatea
hippocamp
exoplanet
farout
ganymede
gonggong
haumea
hyperion
pulsar
iapetus
io
tethys
kepler
kepler-22b / kepler-22
makemake
mimas
moon / luna / lunar "humans have seen the exact same spot of the moon for all of history"
oberon
orcus
phobos
wolftopia
altair
planet nine
planetoid
pluto
polaris
pollux
proteus
quaoar
rhea
rigel
salacia
satellite
sedna
sirius
sun / star / sol / solar
tau ceti
titan
titania
triton
umbriel
varda
vesta
hygiea
antares
vega
canopus
deneb
chicxulub "the asteroid that killed the dinosaurs"
halley's comet / halley
dione
cruithne
kamo'oalewa
proxima centauri

[planets]
mercury
venus
earth / terra / the world / the globe
mars
jupiter
saturn
uranus
neptune

[constellations]
= zodiac
andromeda
antlia
apus
aquarius
aquila
ara
aries
scutum
argo navis / argo / ship argo
auriga
big dipper
boötes
caelum
camelopardalis / camelopardis
cancer
canes venatici / canis venatici
canis major
canis minor
capricornus / capricorn
carina
cassiopeia
centaurus
cepheus
cetus
chamaeleon
circinus
columba
coma berenices
corona australis
corona borealis
corvus
crater
crux
cygnus / northern cross
delphinus
dorado
draco
equuleus
eridanus
fornax
gemini
grus
hercules
horologium
hydra
hydrus
indus
lacerta
leo
leo minor
lepus
libra
little dipper
lupus
lynx
lyra
mensa
microscopium
monoceros
musca
norma
octans
ophiuchus / ophiucus
orion
pavo
pegasus
perseus
phoenix
pictor
pisces
piscis austrinus / pisces austrinus
puppis
pyxis
reticulum
sagitta
sagittarius
scorpius / scorpio
sculptor
serpens
sextans
taurus
telescopium
triangulum
triangulum australe
tucana
ursa major / ursa
ursa minor
vela
virgo
volans
vulpecula

[mythological gods]
= deities / gods / goddesses
aphrodite / venus
apollo / phoebus
apophis
ares / mars
artemis / diana
athena / minerva / pallas
cronus / kronos / saturn
demeter / ceres
dionysus / dionysos / bacchus / liber
eileithyia / eileithyie / lucina
eros / cupid / amor
hypnos / hypnus
gaea / ge / tellus / terra mater / terra / mother earth
hades / pluto / dis
hebe / juventas / iuventas
helios / sol
hephaistos / hephaestus / vulcan
hera / juno / iuno
hermes / mercury
zephyrus
asclepius
hestia / vesta
janus
loki
nike
pan / faunus
persephone / cora / kore / proserpina
poseidon / neptune / neptunus
rhea / rheia / kybele / ops
selene / luna
uranus / caelum / ouranus
zeus / jupiter
thor
iris
hecate
odin
frigg
tyr
heimdall
baldur
bragi
idun
njord
freya
freyr
forseti
ymir
mimir
sif
atum
shu
tefnut
nut
osiris
isis
geb
set / seth
nephthys
anubis
horus
ra / rah
tethys
nemesis
bastet / ubasti / bubastis
frey
thoth
dione
atira
tirawa
cardea / carda
gaia
vishnu / krishna
hel

[tarot cards]
The Fool
The Magician
The High Priestess
The Empress
The Emperor
The Hierophant
The Lovers
The Chariot
Strength
The Hermit
Wheel of Fortune
Justice
The Hanged Man / The Hangman
Death
Temperance
The Devil
The Tower
The Star
The Moon
The Sun
Judgment / Judgement
The World

[chess pieces]
pawn
rook
knight
bishop
queen
king

[playing cards]
ace
two
three
four
five
six
seven
eight
nine
ten
jack
queen
king
spade
club
diamond
heart
joker


[periodic table]
hydrogen
helium
lithium
beryllium
boron
carbon
nitrogen
oxygen
fluorine
neon
sodium / natrium
magnesium
aluminum / aluminium
silicon
phosphorus
sulfur / sulphur
chlorine
argon
potassium / kalium
calcium
scandium
titanium
vanadium
chromium / chrome
manganese
iron / ferrum
cobalt
nickel
copper / cuprum
zinc
gallium
germanium
arsenic
selenium
bromine
krypton
rubidium
strontium
yttrium
zirconium
niobium / columbium
molybdenum
technetium
ruthenium
rhodium
palladium
silver / argentum
cadmium
indium
tin / stannum
antimony / stibium
tellurium
iodine
xenon
cesium / caesium
barium
lanthanum
cerium
praseodymium
neodymium
promethium
samarium
europium
gadolinium
terbium
dysprosium
holmium
erbium
thulium
ytterbium
lutetium
hafnium
tantalum
tungsten / wolfram
rhenium
osmium
iridium
platinum
gold / aurum
mercury / quicksilver / hydrargyrum
thallium
lead / plumbum
bismuth
polonium
astatine
radon
francium
radium
actinium
thorium
protactinium
uranium
neptunium
plutonium
americium
curium
berkelium
californium
einsteinium
fermium
mendelevium
nobelium
lawrencium
rutherfordium
dubnium
seaborgium
bohrium
hassium
meitnerium
darmstadtium
roentgenium
copernicium
nihonium
flerovium
moscovium
livermorium
tennessine
oganesson / ununoctium
ununennium
unbinilium
neutronium

[states of matter]
= state of matter
solid
liquid / fluid / condensation
gas / vapor
plasma
bose einstein
fermionic
superfluid
supersolid
degenerate
supercritical fluid / scf


[crimes]
"we do not condone!"
= criminal
abduction / abducting / kidnapping
adultery
affray
aiding / abetting / accomplice
arson / immolation
asphyxiation / choking
assassination / assassinating / assassin
assault / hurting / abuse / beating / thrashing / wounding / battery / rape
attempt / attempted
blackmail
bombing
brandishing / menacing
martyrdom / martyr
bribery / bribing
cannibalism / cannibal
cockfight / dogfight
coercion / coercing
conspiracy
contraband
corruption / corrupted / corrupt
counterfeit
cyberbullying / cyberstalking
damage
defamation / slander
desertion
destruction
dismemberment / dismember
disorderly conduct / disturbing the peace
distribution
dui / drunk driving / drunk driver / drinking and driving
embezzlement / embezzling
encroachment
endangerment
espionage / spying
extortion / extorting
false imprisonment
falsification / falsifying
familicide
felony
femicide
filicide
forgery
framing
fratricide
fraud / defrauding / fraudulent
gambling / betting
gang / gangster / mafia / mobster
genocide
graffiti
grand theft / grand theft auto / carnapping / carjacking / heist / looting
hacking
harassment
hate crime / discrimination
hazing
hijacking
hit and run
hooliganism
impersonation / impersonating / identity theft
indecency / indecent exposure / nudity
infanticide
infraction / citation / misdemeanor
insider trading
intimidation
invasion of privacy / privacy invasion
jaywalking
larceny / theft / stealing / thief / robber / robbery / mugging / burglary / jacking / robbing
laundering
libel
littering / dumping
lobotomy
loitering
lynching
malpractice
massacre
matricide
mobbing
monopolization / monopoly
murder / kill / killing / manslaughter / slaughter / homicide
mutilation / mutilating / maiming
neglect
negligence
obstruction
omnicide
parricide
patricide
perjury / lying under oath
pickpocketing
pimping
piracy / pirating
plagiarism / plagiarizing
poaching
poisoning
possession
prostitution
racketeering
recklessness / reckless
regicide
resisting
retaliation
revolution / rebellion / coup
riot
road rage
scamming / ripoff / bootleg
sedition
shooting
shoplifting
slavery
smuggling
solicitation / soliciting
sororicide
speeding
spiking / roofie
stabbing
stalking / doxxing / doxing / creeping
tampering
tax evasion
terrorism / terrorist
threat / threatening
torture
waterboarding
trafficking
treason / treachery
trespassing
underage
unlicensed
vandalism / vandal
vigilantism
violence / violent
war crime

[morbidities]
= morbid
& weapons
& crimes
addiction / addict
alcohol / alcoholic / alcoholism / drunk / drunken
alzheimer's / dementia
arthritis
asthma
avarice
argument
awful
necromancy
obsession / obsessed / obsessive
hater
hypothermia
extinction
impossible
obesity
diabetes / diabetic
dystopia / dystopian
rabies / rabid
injury / injured
apocalypse / doomsday
accident / mistake
murderer / killer
creep / weirdo / freak
loser / loner / mook
weird / strange / abnormal
dishonest / dishonesty
phobia
allergy
fallout
ebola
headache
fever
execution / capital punishment
conquest
vermin / pest
wither
drowning
pneumonia
haunted / ghastly
pessimism / pessimistic
brainrot
victim
perpetrator / perp
mourning
snot / booger
pandemic / epidemic / outbreak
curse / hex
homelessness / homeless / unhoused
disorder / disability
sacrifice
r.i.p.
bad / evil / terrible / horrible / wicked / worse / worst
incontinence
anorexia / anorexic
schizophrenia / schizophrenic / schizo
battle
bigotry / racism / homophobia / transphobia / sexism / misogyny / misandry / xenophobia / ableism / ageism
blackjack
carnage
casket / coffin
enemy / foe / opponent / opps
cemetery / graveyard
kiki
shrooms
chaos / havoc
omen / ominous
cheating / cheater
cigar
cigarette
cocaine
coma / comatose
corpse / carcass
danger / dangerous
covid-19 / covid / coronavirus / corona
malaria
creepy / scary / eerie / spooky / spoopy
criminal
cyclops
darkness / dark / shadow
death / die / dying / dead / fatality / fatal / died
macabre
lsd
demon / devil / imp
depression / depressed / gloom / gloomy
deviancy
dictator / fascist
dictatorship / fascism
dirty / filthy / filth / septic / grime / mess / messy
disease / virus / plague / sickness / ailment / sick / illness / ill / infection / infected / germ / pathogen / pathogenic / unwell
jaundice
dread
drugs
dumb / stupid / foolish / lame
dust
envy / envious / jealousy / jealous
explosion / explode / blast
famine
fart / brap
fentanyl / fent
fight
inability / unable
fool / idiot / bozo / doofus / numbskull / twat / dumbass / noob / newbie / newb / nitwit / buffoon / dummy / dumbahh / rookie
funeral / burial
ghost / ghoul / specter / spectre / phantom / spirit / ghostly / ghast
gluttony / glutton
gore / gorey / gory
grave / tomb / gravestone / tombstone
greed / greedy
grim
guilt
hantavirus
hell / purgatory
heroin
hiv / aids
horrific
horror
hunger / hungry / starving / starvation / starve
immoral
inequality
influenza / flu
lie
lust / lustful
mean / rude / jerk / brat
methamphetamine / meth
misery / suffering / turmoil / blight / tyranny / calamity / disaster / disastrous / torment
pneumothorax
tuberculosis / tb
typhoid
polio
misinformation / disinformation / misinfo / disinfo
monster
morphine
mort / micromort
mortality / mortal
nicotine
nightmare
opioid / opium
sepsis
parasite / parasitic / parasitism
pestilence
plutonium
poison / poisonous / toxin / toxic
poker
pollution
predator / predation / predate
pride / hubris
radioactivity / radioactive / radiation
decay / decayed / rot / rotting / rotten / rotted
sad / sadness / blue
salmonella
satan / lucifer / the beast
satyr
sin / sinful / blasphemy / blasphemous
skeleton
sloth
sludge
spaghettification
stinky / smelly / gross / disgusting / nasty / stink
suicide / suicidal / self-immolation
scurvy
tetanus
zika
prion
mold / mould / moldy / mouldy
taboo
tobacco
trash / junk / garbage / debris / waste / scum / rubbish
twisted
tyrant
ugly
uranium
vain
vampire / vamp / dracula
void
war
weakness / weak
werewolf
wrath
zombie

[blissfuls]
= bliss
light / shine / bright / sunlight
democracy
justice
happy / happiness
god / goddess / allah / yahweh / yhwh / elohim / idol
demigod
silence
life / alive / living
halo
seraph / seraphim
humility
wholesome
winner
charisma
ethereal
freedom / free / liberty / liberation
wedding
possible
treasure
pure
truth
able / ability
reincarnation / reincarnate
celebration
favorite / favourite
fact
fan / supporter
bouba
strength / strong
enlightenment
nirvana
archangel
genius / wiz
miracle / blessing
heaven / afterlife
smart / intelligent / intelligence
wit / witty
optimism / optimistic
victory / win
revolution
power
angel
creativity
fortune / luck / lucky / fortunate
privilege
love / romance
immortality / immortal / invincible / invulnerable
sleep
laughter / laugh
cure / vaccine
clean / hygiene
good / great / better / best
holy / apocryphal
nice / kind
morality / moral
savior
hero
peace / peaceful / pacifist
beauty / beautiful / pretty / handsome / baddie
humble
perfect / perfection / ideal
serene / scenic
awareness / aware
destiny
ignorance / ignorant "it is bliss"
worship
adorable / cute
birth
pride / proud
amazing / wonderful / fantastic / awesome / fabulous
excellent
fun
leisure
whimsy / whimsical
funny / hilarious
silly
gift / present
health / healing
mercy / merciful
determination "seeing this word fills you with determination"
angelic
benevolent
gorgeous
honest / honesty
neato / neat
passion / passionate
radical
splendid
swell
buddha
jesus / christ
muhammad / mohamet / mohammed / mahamad / muhamad / mohamed / mo / moe
apostle

[emotions]
= feelings / moods / emotional / behavior / behaviour
admiration / admire / admiring
aggression / aggressive / aggressiveness
alert
amazed / amazing / amaze / awe / amazement / astonishment
anger / angry / furious / irate / mad / rage / wrath / madness / enraged / livid / pissed / fury
submission / submissive / obeyance / meek
dominance / dominant
hangry
annoyed / annoying / annoy / annoyance / indignant
aloof / removed / distant
anxiety / anxious / worry / worried / nervous / nerve / nervousness / butterflies
concern / concerned
apprehension / apprehensive
curiousity / curious / wonder
independence / independent
dependence / dependent
approval
energetic / energized
aroused / arousal
serious
joking / unserious
disappointment / disappointed
confidence / confident / charismatic / secure / security
sassy / sass
amusement / amused / giddiness / giddy
hype / hyped
comfort / comfortable / comforted
discomfort / uncomfortable
brave / fearless / bravery
tired / exhausted / sleepy / eepy / exhaustion
bored / boredom / ennui
calm / mellow / chill / calmness / easygoing
nostalgia / nostalgic
acceptance
lachrymose / lachrymosity
jolly / festive / merry
insanity / insane
hate / hatred / hateful "HATE. LET ME TELL YOU HOW MUCH I'VE COME TO HATE YOU SINCE I BEGAN TO LIVE"
schadenfreude
pleasure
shy / bashful / bashfulness / coy / diffident / modest / modesty / timid / awkward / insecure / insecurity
inspired / inspiration
ecstasy
denial "is that a river in egypt?"
embarrassment / embarrassed / embarrass / shame / shameful / shamed / flustered / flushed
confused / confusion / bewildered / bewilderment / lost / perplexed
passion / passionate
dizzy / dizziness
contempt
grudge
neutral / normal
delighted / delight / delightful
depression / depressed
disapproval
disgust / disgusted / appalled
mysterious
disinterest / disinterested
dissatisfied
distracted / distraction
agony / pain / painful / ache / anguish / sore
numb
sarcasm / sarcastic
hurt / offended / offense
distrust
dread
ecstatic / elated / elation
envy / envious / jealousy / jealous
excited / excitement / excite
fear / scared / terrified / terror / scary / trembling / fearful / horrified / spooked / fright
gloomy
grateful / thankful
grief / grieving / mourning
guilt / guilty
hope / hopeful / optimistic / optimist / optimism
faith / faithful
interest / interested
joy / happy / joyful / happiness / gleeful / glee / glad / gay / joyous
loathe / loathing / loathed
love / romance
miserable
panic / panicked / panicking
peace / peaceful / tranquil / tranquility
pensive / pensiveness
pleased / satisfied / satisfaction
enjoyment / enjoy
sympathy / sympathetic
empathy / empathetic
apathy / apathetic
pride / proud / prideful
regret / remorse / remorseful
relaxed / relax / relaxing
sadness / sad / blue / upset / unhappy / unhappiness
serenity
shock / shocked / stunned / surprise / surprised / taken aback
misery / suffering / turmoil
sorrow
stressed / stress / stressful / tense / distress / distressed
trust
understanding
valence
vigilance / ready / readiness / vigilant

affection
ambivalence
angst
anticipation
appreciated
ardor
belonging
bittersweet / bittersweetness
brokenness / broken
caution / carefulness
caring
certainty
cheerfulness / cheerful
contentment / content
cowardice / coward
cranky / grumpy
courage / courageous
defensiveness
desolate / desolation / emptiness / empty / despair
determination / determined
distaste
melancholy / melancholic / dejection / dejected
distraught / devastated / devastation
doubt / doubtful / disbelief
drab
dysphoria / dysphoric
elevation / elevated
enchantment
encouragement / encouraged
enthusiasm / enthusiastic
euphoria / euphoric
fascination / fascinated
flabbergasted
frustration / frustrated
generosity
glory
gratification / gratified / gratitude
helplessness / helpless
hesitation / hesitant / hesitating
heartbreak / heartbroken
horny
hostility / hostile
humiliation / humiliated / humility
isolation
jocund / jocundity
jovial / joviality
kindness / kind
laziness / lazy
loneliness / lonely / lonesome
lovesick / limerence
loyal
lust / lustful
misunderstood / misunderstanding
motivation / motivated
outrage / outrageous
overwhelmed / overwhelming
paranoia / paranoid
pity / pitiful
rejection / rejected
restless / restlessness
relief / relieved
remorseless
resentment / resentful
sanity
yearning / longing / saudade
self-pity
self-consciousness / self-conscious
solitude
somber
suspicion / suspicious / sus
thankfulness thrill / timidity
trauma
uneasy
unsure
woe / woeful
yearn
zeal
cringe

[lgbtq+]
= sexuality / gender / orientation / sex / identity / lgbt / lgbtq / lgbtqi / lgbtqia / lgbtqia+ / glbt / lgb
"be who you are for your pride!"
a-spec
abroromantic
abrosexual / abro
achillean
cupioromantic
aegoromantic
lunarian
queergender
solarian
berrisexual
aegosexual
heterosexual / straight / hetero
cisgender
catgender
doggender / dogender
kingender
pomosexual
cishet
afab
agender
polysexual
gender envy
alloromantic
mpreg
allosexual / allo
ally
transneutral
biromantic
amab
androgyne / androgynous / androgyny
androromantic
androsexual
aporagender
aromantic / aro / aroace
twunk
asexual / ace
bicurious
bigender
bisexual / bi
butch
masc
ceteroromantic
ceterosexual
endosex
come out / coming out
cupiosexual
demiboy
demigender
demigirl
demiromantic
demisexual / demi
diamoric
drag
dysphoria
enbian
estrogen / oestrogen
testosterone
progesterone
fa'afafine
femboy
femme
fujoshi
himejoshi
lithosexual / lithsexual
queerplatonic / qpr
hormone replacement therapy / hrt
finsexual
minsexual
ninsexual
faesari
faesexual
faeromantic
polycule
genderfae / genderdoe / genderthil
genderfaun / genderfawn
fianxé
datemate
theyfriend
gay / homosexual / mlm
genderfluid
genderflux
genderqueer
grayromantic / greyromantic
graysexual / greysexual / grayasexual / greyasexual
graygender / greygender
hijra
eunuch
maverique
mogai
multisexual
neurogender
unlabeled
abimegender
amaregender / amare
caelgender
cassgender
gendervoid
aerogender
affectugender
gyneromantic
gynesexual / gynoromantic
intersex
lesbian / wlw / wuh luh wuh
lunaric
mercuric
neopronoun
neptunic
neuter / neutrois
nofinsexual
nominsexual
non-binary / enby / nb
non-conforming / gnc
noninsexual
omniromantic
omnisexual
pangender
panromantic
pansexual
polyamory / polyamorous
polygamy / polygamous
pride
pronoun
qtipoc
queer
questioning
quoiromantic
sapphic / sappho
solaric
stellaric
t4t / tft
tomboy
toric
transfem / transfeminine / trans girl / trans woman / mtf
transgender / trans / transitioning / transsexual
transmasc / transmasculine / trans boy / trans guy / trans man / ftm
trigender
trixic
twink
two-spirit / 2-spirit
xenogender
yaoi / bl / boys' love
yuri / gl / girls' love


[numbers]
& funny numbers
zero / 0 / nought
one / 1 / first / 1st / single / i / uno
two / 2 / second / 2nd / double / ii
three / 3 / third / 3rd / triple / iii
four / 4 / fourth / 4th / quadruple / iv
five / 5 / fifth / 5th / quintuple / v
six / 6 / sixth / 6th / sextuple / vi
seven / 7 / seventh / 7th / septuple / vii
eight / 8 / eighth / 8th / octuple / viii
nine / 9 / ninth / 9th / nonuple / ix
ten / 10 / tenth / 10th / decuple / x
eleven / 11 / banker's dozen / xi
twelve / 12 / dozen / xii
thirteen / 13 / baker's dozen / baker dozen / xiii "okay, i'm not giving you ∞ points"
twenty / 20 / xx
thirty / 30 / xxx
forty / fourty / 40
fifty / 50
sixty / 60
seventy / 70
eighty / 80
ninety / 90
hundred / 100
thousand / 1000
ten thousand / 10000 / myriad
million
billion
trillion
quadrillion
quintillion
sextillion
septillion
octillion
nonillion
decillion
undecillion
duodecillion
vigintillion
tredecillion
centillion
millillion
250 "2026 is the United States's **semiquincentennial**"
360
365
500
pi / 3.14 / π / 3.14159 / 3.1415 / 3.141
tau / τ
phi / φ / golden ratio / 1.618
euler's number / e
infinity / infinite / ∞
googol
googolplex
googolplexian
bajillion / bagillion
morbillion
graham's number
2020 "don't remind me.."
2025 "i remember it like it was last year"
2026 "what will this year bring?"
123456789
1234567890
0987654321
987654321
123 "it's easy as that!"
1234
321
4321
54321
12345
74 "say that again.."
lakh
crore
99 / 9999 / 99999
911 / 999 / 112 / 110 / 117 / 119 / 1122 / 113 / 191 "this is NOT the place to call for help"
half / 0.5 / .5
quarter / 0.25 / .25
0.33 / .33

[funny numbers]
7-eleven / 7-11 / seven-eleven
9+10 "**twenty-one**"
25 / twenty-five "you know what's funnier than twenty-four?"
64 "you're stacked!"
66 "execute order 66"
68 "right in the middle"
118 "brace for impact!!"
404 "word not found.. or was it?"
666 "gulp..."
678-999-8212 "kiss me thru the phone"
777
867-5309 / 8675309 "you're the girl for me!"
910 "pickles?"
1225 "merry christmas!"
1337
1738 "i'm like hey what's up hello"
1984 "literally"
1987 / 87 / 1983 / 83 "WAS THAT THE BITE OF '87?"
2048 "someone could make a game out of this"
2137 / 21:37 "pope hour!"
2763 "bfdi reference"
8008 / 80085 / 8008135 / 58008 / 5318008
69420 / 42069 "wow, two in one"
eight-nine / 89 / 8-9 "this is very niche"
fifteen / 15 "number ^.. burger king foot lettuce"
fifty-six / 56 "FIIFTY SIIIIIIIX"
five out of seven / 5 out of 7 / 5//7 "a perfect score!"
five-five / fifty-five / 55 "FIVE FIVE! FIVE FIVE!"
four-one / 41 "four ooooone"
four-twenty / 420 / 4//20 / 420420 "blaze it"
fourty-two / 42 "the answer to the ultimate question of life, the universe, and everything"
nine thousand / 9000 / 9001 / over 9000 "my power level.."
seven-eight-nine / seven ate nine / 789 "wait.. i'm scared too"
seven-twenty-seven / 727 / 727pp "WHEN YOU SEE IT.."
six-one / sixty-one / 61 "six ooooone"
six-seven / sixty-seven / 67 / 6 7 / 6-7 / 6767 "six seeeeven"
sixty-nine / 69 / 6969 "nice"
thirty-eight / 38 "is this a secret trend?"
twenty-one / 21 "you stupid"
twenty-three / 23 skidoo / 23
808 "it's basically a crashout"
2115 "POLSKA GUROM"
800-588-2300 "EMPIREEEEE"
2038 "this is the year some computers will run out of numbers to represent time"
97104 "this number is divisible by the sum of its digits"
1273 "down the rockefeller street!"
3301 "Good luck."
11037 "a clue.. what could it mean?"
007 "the name's slop. wordslop."

[letters] q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m
á|å|ä|à|ã|æ|ç|é|ë|è|ï|ñ|ó|ö|õ|ø|ß|ü|µ|œ|ú|í|â|ā|ē|ī|ō|ū|ê|ô|ò|ù|û|ń|ǎ|ă|ą|ć
î|ý|č|ę|ž|ł|ė|š|ň|ż|ő|ğ|ű|ļ|ź|ŵ|ť|į|ś|ş|ů|ÿ|ċ|ě|ț|ľ|ď|ħ|ġ
thorn / þorn / Þ
eth / edh / Ð
wynn / wyn / wynne / ƿ / ƿynn / ƿyn
ampersand / & "this was once part of the english alphabet"
yogh / yoch / ȝ / ȝogh
ean / vrrrpt "ah yes, the extended english alphabet"
long s / ſ
eng / agma / engma / ŋ
schwa / ə

[greek letters]
alpha / α
beta / β
gamma / γ
delta / δ / ∆
epsilon / ε
zeta / ζ
eta / η
theta / θ
iota / ι
kappa / κ
lambda / λ
mu / μ
nu / ν
xi / ξ
omicron / ο
pi / π
rho / ρ
sigma / σ / ∑
tau / τ
upsilon / υ
phi / φ
chi / χ
psi / ψ
omega / ω

[arabic letters]
'alif / alif / ا
ba' / ba / baa / ب
ta' / ta / taa / ت / ث / ط
jim / ج
ha' / ha / haa / ح / ه
ka' / ka / kaa / kha / خ
dal / د / ذ
ra' / ra / raa / ر
zay / ز
sin / seen / س
shin / ش
sad / ص
dad / ض
za' / za / zaa / ظ
'ayn / 'ain / ayn / ain / ع
gayn / ghayn / غ
fa' / fa / faa / ف
qaf / ق
kaf / ك
lam / ل
mim / م
nun / ن
waw / و
ya' / ya / yaa / ي
hamzah / hamza / ء

[symbols]
= punctuation, special characters
period / full stop / .
semicolon / ;
asterisk / *
tilde / ~
backtick / \`
exclamation / ! / ¡
at / @
pound / hash / number / hashtag / ##
percent / percentage / %
caret / ^
ampersand / &&
left parenthesis / ( / parenthesis / parentheses
right parenthesis / )
hyphen / dash / -
underscore / underline / _
equals / ==
plus / +
left bracket / [ / bracket / square bracket
right bracket / ]
left curly bracket / { / brace / curly bracket
right curly bracket / }
backslash / \\
pipe / vertical bar / line / ||
colon / :
apostrophe / '
quote / quotation / ""
comma / ,
less than / <
greater than / >
forward slash / // / slash
question / ? / ¿
interrobang / ‽
irony / ⸮
section / §
pilcrow / paraph / paragraph / ¶
numero / no. / №
bullet / •
times / multiplication / ×
copyright / ©
trademark / tm / ™ / ®
ellipsis / ellipses / ...
cross / dagger / †
division / divided / ÷
tally / tally mark / hash mark
counting rod
plus-minus / plus or minus / ±

[video games]
60 seconds
a dance of fire and ice / adofai
a hat in time
ace attorney / phoenix wright
adopt me
akinator
among us
angry birds "aaaah heheha"
animal crossing
apex legends
the world ends with you / twewy
katamari
titanfall
bloodborne
vrchat
baba is you
oregon trail
call of duty / cod
maimai
chunithm
in stars and time
arma
runescape
sprunki
arms
r.e.p.o.
assassin's creed
balatro
rainworld
baldi's basics / baldi "collect my noteboos"
baldur's gate
banban
banjo-kazooie
battlefield
bayonetta
beatmania
bejeweled
bendy / ink machine / batim
binding of isaac / isaac
bioshock
block tales
bloons / btd / btd6
borderlands
bornana "is that even a real fruit?"
brawl stars
brawlhalla
candy crush
castle crashers
castlevania
celeste
chrono trigger
civilization / civ
clash of clans / clash royale
counter-strike / cs
crash bandicoot
crossy road
cyberpunk
dance dance revolution / ddr
danganronpa
dark deception
dark souls
date everything
day-z
dead by daylight
dead space
deadlock
deep rock galactic
destiny
detroit / become human
diablo
disco elysium
dispatch
don't starve
donkey kong
doom
dota
dragon age
dragon quest
duck hunt
earthbound
elden ring
elder scrolls / skyrim / oblivion
f-zero
fall guys
fallout 
far cry
final fantasy
fire emblem
firewatch
flappy bird
fnaf / five nights at freddy's / fazbear / william afton / purple guy "or or or or or"
forsaken / gubby
fortnite / jonesy "number one victory royale!"
forza
friday night funkin' / fnf
frogger
fruit ninja
game builder garage
garfield cart
garry's mod / gmod
gears of war
genshin impact / genshin
gentown
geometry dash / gd "holy gd reference"
god of war / ragnarok
goldeneye
grace
grand theft auto / gta
guild wars
guitar hero
half-life
halo
helldivers
hello neighbor
hitman
hollow knight / silksong / hallownest
honkai star rail / honkai / hsr
hotline miami
human fall flat
infinite chef
just dance
kerbal space program / ksp
kid icarus
king of fighters
kingdom hearts
kirby
knives out
last of us
league of legends / lol
left 4 dead
lethal company
little big planet
lobotomy corporation / lobotomy corp
madden
mario / warioware / luigi / wario / waluigi "it's-a-me!"
marvel rivals
mass effect
medal of honor
metal gear solid
metroid / metroidvania
minecraft / mc / steve / herobrine "i am typing words and stuff cus i am playing wordslop"
minesweeper
monster hunter
mortal kombat
mouthwashing
my winter car / my summer car
nba 2k
need for speed
oddworld
omori "waiting for something to happen?"
oneshot
osu! / osu
overwatch
pac-man
papers, please / papers please
payday
perfect dark
persona
phasmophobia
pikmin "piiiikmiiiin"
pizza tower
plague inc
plants vs zombies
pokémon / pikachu / eevee / vaporeon
pong
poppy playtime
portal
project diva
project sekai / pjsk / colorful stage
project zomboid / zomboid
psychonauts
pubg
punch-out
quake
rainbow six / r6 / tom clancy
rec room
red dead redemption / red dead / rdr
resident evil
rhythm doctor
rhythm heaven
roblox "oof"
rocket league
rust
sandboxels
scribblenauts
sims
skullgirls
smash brothers / smash bros
snake
snipperclips
sonic / sanic "gotta go fast!"
space invaders
splatoon / coroika / inkling "woomy!"
spongebob / battle for bikini bottom
spyro
stanley parable
star fox
stardew valley
steal a brainrot
street fighter
subnautica
super monkey ball
taiko no tatsujin / taiko /taiko drum master
team fortress
tekken
terraria "also try **minecraft**"
tetris
timesplitters
tomb raider
tomodachi life / miitopia "a vending machine would go great right here"
tony hawk's pro skater
touhou
town of salem
trackmania
ultrakill / v1
umamusume
uncharted
undertale / deltarune / sans / papyrus / jevil / togore / gaster / frisk / chara / toriel
until dawn
valorant
voices of the void / votv
walking dead
watch dogs
witcher
wolfenstein
wordle / connections
wordslop
world of warcraft / wow
xenoblade
yakuza
yandere simulator
yume nikki
zelda / link
zenless zone zero

[fandoms]
& video games
aespa
akira
amazing digital circus / digital circus / tadc / pomni / jax / kinger / ragatha / caine / zooble / gangle / digital hallucination
amphibia
animation vs animator / animator vs animation / alan becker
anime
arcane
ateez
attack on titan / aot
hulk
mickey mouse / mickey
avatar
tron
pocoyo
apex legends / apex
gorillaz
slipknot
the beatles
metallica
gravity falls
xkcd
game of thrones
muppets
enhypen
babymonster
my chemical romance / mcr
doraemon
heaven official's blessing / tianguancifu / tgcf
zootopia
looney tunes
baki
powerpuff girls
batman
spider-man
superman / supergirl
hamilton
berserk
bfdi / battle for dream island / bfb / tpot / bfdia / object shows / yoyle / yoylecake / yoyleland / bfdie / inanimate insanity / carykh
asdfmovie / tomska
mcyt / minecraft youtubers
blackpink
bluey
bojack horseman
breaking bad / brba / better call saul / bcs
bts
chainsaw man
clifford
countryballs / planetballs / companyballs / polandball
cowboy bebop
cuphead
death note
demon slayer
dexter
digimon
dnd / d&d
doctor who / tardis
doki doki literature club / ddlc
dragon ball / goku
dungeon meshi / delicious in dungeon
ena
evangelion / neon genesis
frieren
furry
gameoverse
garfield
ghostbusters
gundam
haikyuu!! / haikyuu
harry potter / hogwarts
hazbin hotel / hazbin "can we NOT talk about that right now?!"
hearts2hearts
hellsing
helluva boss
hetalia
homestar runner / trogdor
homestuck
horizon
hunger games
i-dle
illit
inuyasha
invader zim
invincible / omniman "are you sure?"
itzy
jojo's / jojo / jojo's bizarre adventure / joestar "yare yare daze.."
jujutsu kaisen / jjk
jurassic park / jurassic world
kagurabachi
kamen rider
katseye "gnarly.."
kiiikiii
knights of guinevere
kpop demon hunters
le sserafim
limbus company / limbus
loona "stan loona"
lorax / onceler
lord of the rings / lotr / the hobbit
american dad
icarly
madoka magica / magical girls / puella magi
manga
marvel
murder drones
hannibal
wings of fire / wof
hololive
euphoria
love island
my hero academia / mha
my little pony / mlp
naruto / boruto
newjeans
nmixx
octonauts
one piece
pingu "noot noot"
protogen
sailor moon
sanrio / hello kitty
scott pilgrim
sherlock holmes / sherlock
smurfs
spongebob "i'm ready!"
star trek
star wars
stranger things
stray kids
studio ghibli / ghibli / ponyo
supernatural
ten words of wisdom / twow / eleven words of wisdom / ewow
the boys / homelander / starlight "excuse me sir"
the incredibles
the owl house / toh
the simpsons
thomas the tank engine
toon force
transformers
twice
uncle grandpa
utena / revolutionary girl
voltron
wallace and gromit
weezer
world of gumball / tawog
x-men
xg
xlov

[memes]
& funny numbers
accurate hitboxes "is it possible?"
address me / elephant in the room
ahh / dumbahh
alpha / beta / omega / alpha male / beta male
among us / amogus / sussy / sus / crewmate / imposter / impostor / ඞ
aura / aurafarming "wordslopping gives a huge aura boost"
baby boo "she don't call me"
baby gronk / livvy dunne
backrooms
baka
ball knowledge
ballerina cappucina
hampter
wawa
gnomed
brat
coconut tree
ballin'
bazinga
edwin / the mimic
bazooka "rip granny"
bet
big chungus / chungus
pattern recognition
bīng qí lín / bing chilling
bingus
blåhaj
blud
bnnuy / bnuuy / bnuny / bnuyy
bober
boi
bomboclat / mi bombo "MI BOMBO-"
bonesmashing
boomer "ok boomer"
brainrot
brr patapim / brr batipim
bruh / bruv "this is a ^ moment"
bussin'
calc "is that slang?"
cap / no cap / capping "on god?"
caseoh
catto
chat "chat let's go wordslop"
chezburger "can i have pls"
chicken jockey / crafting table / water bucket / the nether / ender pearl
chill guy "my new oc"
chipi chipi chapa chapa "dubi dubi daba daba"
chonk / chonker / chonky
chopped
chuck norris
chuck testa
chud "act like a chud"
chuzz
cinema "absolute.. CINEMA"
clanker
clavicular / clav
clipping "chat clip that"
clippy "be like clippy"
coco "i didn't even know a **^** went to our school"
coffin dance
computa "computa give this guy a new word"
cook / cooking
cooked
cope / copium
copypasta
cornball / corny
durr
cortisol "wordslop players have low cortisol levels"
crab rave
crash out / crashing out
crazy "crazy? i was crazy once"
creepypasta
crine / son / sonion "sonion 😭😭😭"
cringe
dab "you did NOT just hit that in the big 2026"
dabloons
dank "in the big 2026?"
dat boi "waddup"
deadass / deadahh
deez / deez nuts "got em.."
delulu
derp
diddy / diddyblud
dih
doge "so word very wow"
doggo
domer
doomscrolling / doomscroll
drain gang
drip / drippy
driving in my car / after a beer / asgore
dubai chocolate
ea-nāṣir "refund me NOW!"
eeffoc "it's funny!"
emotional damage
en passant
enshittification "everything is turning to **slop**.."
epstein
excuse me sir "there must be someone you've confused me for"
f students "also known as **the inventors**"
fah / fahh / fahhh / fahhhh / fahhhhh / faaa
fanum / fanum tax "half of your words belong to me"
fih
floater "it's a **^**!"
flop
floss
flow state
foid / moid
forever alone
forgor "i forgor 💀"
freakbob "would you pick up?"
freaky "𝓱𝓮𝓵𝓵𝓸 𝓫𝓻𝓸 ❤️"
friendslop "wordslop can be friendslop too"
frigo camelo
funni
fw
fym
gangnam style
gaslight
gatekeep
geeked
gem alert / gemerald
get in the car / isn't the car
gigachad
girl dinner
girlboss
git gud
glaggle
glazing / glazer
glungus
gnarly
goat / goated "wordslop is goated"
golden dandelion
goober
good boy / good girl "umm.. thank you?"
goofy
goon / gooning / gooner / jestergooning / jork
grabba
griddy
grimace shake
gurt "yo"
gyatt / gyat
hachimi
hantavirus "not again.."
harambe
hat man / benadryl
hawk tuah / tuah "spit on that thing!"
huzz
hyperpigmentation "no.. it's nice"
iceman "i am iceman man i am iceman man"
illuminati "coincidence? i think not"
j*b "thank you for censoring"
jackpot
jeff
job / jobless "can you censor that next time?"
job application "AHHHHH!"
john cena "why did you enter a blank word?"
john pork "will you answer his call?"
jonkler
jumpscare "AHHHHH!"
just walk around / simply walk around "well, it depends on the stud count"
yessir
oomf
kai cenat
kappa "everybody spam Kappa in the chat"
karen "someone call the manager.."
kawaii
kendrick / kendrick lamar
keyboard cat
keysmashing
kid named finger "who names their kid that?"
kijetesantakalu
kirk / kirkenuinely / lowkirk / lowkirkenuinely / kirkify / kirkified / kirkification / kirky
L "L for sLop"
labubu
larp / larping / larper "we, yes WE, are larping wordslop"
lenny "( ͡° ͜ʖ ͡°)"
ligma / sugon / sugondese "what is that??"
lil bro "lil bro is wordslopping"
lobotomy
lolcat
lolcow
longcat
looksmax / looksmaxx / looksmaxxing / looksmaxing / looksmaxxer / looksmaxer
loss / is this loss "|| |||| |||| ||_"
low taper fade "it's still massive"
lowkenuinely
lowkey / highkey / lowk
lunchly "i like my cheese drippy bruh"
mafiabob
mambo
maxxing / maxing
mcqueen "kachow!"
mew / mewing
minion
minions
mlg "MOM GET THE CAMERA"
mne tak tak
moai "🗿"
mogged / mogging / mog / framemog
monke
morbius / morbillion / morbin' "HOW many tickets?!"
mrbeast "pls send me a million dollars"
mustard "mustaaaaard"
my sunshine / lebron "my only sunshine"
nene "watch me whip"
newgen
simp
niche
nina "just vote.."
no-scope
noice
nonchalant "literally me when wordslopping at work.."
npc
nutella tricks / nutella class
nyan cat "nyannyannyannyan nyannyannyannyannyan nyannyan"
obamium "finally"
obamna
ohio "only in ohio"
oiiai / oia / oiia
okurrr / okurr
omegaverse
one does not simply
ong
oof
ouu shi / ouuu shi / ouu shii
owo "what's this?"
pepe / peepo
perchance
pibble "rub my belly!"
pingas
pluh "pluh!"
pmo
pog / pogchamp / poggers
polska gurom / polska górą
pookie
popcat
pou
property in egypt "what they do for you is, they give you the property"
quandale dingle
rage face / rage comics
ragebait "grrrrrr!!!!!"
rah
retro / retroslop
rickroll "we're no strangers to love"
rizz / the rizzler / rizzer
road work "i sure hope it does!"
roflcopter
sanic
scientology "go go go!"
scp
scuba "that cat's got moves!"
sdiybt "ME?"
sheesh
shrek
sigma "did you know sigma is a Greek letter, too?"
sirenhead
sisyphus "sisyphus but instead of a boulder he types words all day"
skibidi
skill issue
slay
slenderman "collect my words"
slickback "a **pimp** named slickback"
slop
smurf cat "we live we love we lie"
soyjak / soyjack
sparta
speed / ishowspeed / kinda homeless / kind of homeless / i need this
speedrun "how fast can you beat this category?"
spoony spoonicus
spoopy / spooked / spooped
steamed hams "**wordslop**? at this time of year? at this time of day?"
stonks "$SLOPCOIN TO THE MOON"
strawberry elephant "bro that's a rare brainrot"
swag
sybau / syfm "not nice!"
tea
technologia
terminally online
the big 26 / the big 25 / the big 2026
the game "you just lost the game (not really, keep playing!)"
the nile "is that a river in egypt?"
the whip / nae nae
thug shaker
tiki tiki
tiktokification
toothless dance
tralalero / tralala / tralalelo
troll / trollface / trololo
trolley problem
ts
tuff "ts is so tuff"
tung tung / tung / sahur / triple t / tung tung sahur
unalive
unc / chunc
updog "what's updog?"
uwu "hai~"
vro
W / dub "W for wordslop"
we're playing bendy "so that's why"
wojak
woke "the woke left? without saying goodbye?"
wuh luh wuh
xd / xdd / xddd / xdddd
xnopyt
ya ya ya "raise it"
yap / yapping
yara yara
yee
yeet
yolo
your mom / ur mom "leave her alone!"
ytp / youtube poop / rytp
yummers
zamn
zesty
тoтя / totya

[long words]
antidisestablishmentarianism
chargoggagoggmanchauggagoggchaubunagungamaugg / chargoggagoggmanchauggauggagoggchaubunagungamaugg
counterrevolutionaries
deinstitutionalization
demisemihemidemisemiquaver
disproportionableness
electroencephalograph / electroencephalographically
floccinaucinihilipilification
hippopotomonstrosesquippedaliophobia / hippopotomonstrosesquipedaliophobia / hippopotomonstrosessquipedeliaphobia "what does that mean AHHHHHHH"
honorificabilitudinitatibus
humuhumunukunukuapua'a
hydrochlorofluorocarbon / difluoromonochloromethane / chlorodifluoromethane
immunoelectrophoresis / radioimmunoelectrophoresis
immunoelectrophoretically
incomprehensibilities
laryngotracheobronchitis
methionylthreonylthreonylglutaminyl
methylenedioxymethamphetamine
otorhinolaryngological
otorhinolaryngologist
pneumonoultramicroscopicsilicovolcanoconiosis
prostatoseminalvesiculectomy
pseudohermaphroditism
pseudohypoparathyroidism / pseudopseudohypoparathyroidism
supercalifragilisticexpialidocious
transinstitutionalization
gastrocnemiosemimembranous
psychophysicotherapeutics / psychophysicotherapeutically
hyperapobetalipoproteinemia

[types of words]
= parts of speech / part of speech / grammar
abbreviation / abbr
acronym / initialism
adjective
adverb
antonym / opposite
aptronym / aptonym / euonym
article
auxiliary
prefix
password / passcode
vocabulary / vocab
blaspheme
clause
epithet
euphemism
hieroglyph
affix
neologism
slang
compound
metaphor
superlative
suffix
backronym
uppercase / capital / capitalized
lowercase
capitonym
collective noun
conjunction / conjunctive
anagram
solfège
holonym
meronym
anadrome / ananym / emordnilap / semordnilap
contronym
coverb
demonym
determiner
diminutive
doublet
emoji
endonym
ethnonym
exonym
heteronym
homonym
rhyme
homograph / homoglyph
logograph / logogram
homophone
intensifier
interjection / exclamation
interrogative
loanword
name
neopronoun
nonce / nonce word / occasionalism
noun
numeral
object
ology
onomatopoeia
palindrome
paronym
particle
patronym / patronymic
participle
clitic
classifier
infix
contraction
emoticon
kaomoji
gerund
phantonym
plural
portmanteau
predicate
preposition
pronoun
proverb
pun / word play
quantifier
reborrowing
retronym
singular
subject
synonym / alias
pseudonym
nickname
surname
swear / cuss / bad / naughty / dirty
typo / misspelling / mispelling
verb

[fonts]
arial
comic sans
consolas
courier
garamond
georgia
grotesk
helvetica
impact
monaco
monospace
cursive
noto sans
papyrus
press start 2p
roboto
sans
serif
times new roman
trebuchet
verdana
vt323
tahoma
futura
wingdings

[typing]
asdf
qwerty
qwertyuiop
qwertyuiopasdfghjklzxcvbnm
qazwsxedcrfvtgbyhnujmikolp
asdfghjkl
zxcvbnm
abcdefghijklmnopqrstuvwxyz
abc
abcd
abcdefg
colemak
qwertz
hijklmnop
qrstuv
qaz
wxyz
xyz
wasd
qwertyuiopasdfghjkl
asdfghjklzxcvbnm
qwertyuiopzxcvbnm
poiuytrewq
lkjhgfdsa
mnbvcxz
mnbvcxzlkjhgfdsapoiuytrewq
plokimjunhybgtvfrcdexswzaq
zyxwvutsrqponmlkjihgfedcba
mnbvcxzlkjhgfdsa
lkjhgfdsapoiuytrewq
mnbvcxzpoiuytrewq
123456789
1234567890
0987654321
987654321
123
1234
321
4321
54321
12345
1234567890qwertyuiopasdfghjklzxcvbnm
\`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,.//
\`1234567890-=
azerty
azertyuiop
azertyuiopqsdfghjklmwxcvbn
home
end
esc / escape
tab
caps lock
shift
windows / win key
fn lock / function lock
altgr / alt graph
fn / function
ctrl / control
alt / option
cmd / command / ⌘
prtsc / prtscn / print screen
backspace / delete / del
spacebar / space
enter / return
arrow
scroll lock
num lock
page up / pgup
page down / pgdn
insert
f1 / f2 / f3 / f4 / f5 / f6 / f7 / f8 / f9 / f10 / f11 / f12
numpad
dvorak
plokmijnuhbygvtfcrdxeszwaq
zxcv
uiop
ghjkl
vbnm
sksksk / sksksksk / sksk
zaqwsxcderfvbgtyhnmjuiklop
zaqxswcdevfrbgtnhymjukilop
polikujmyhntgbrfvedcwsxqaz
polkiujmnhytgbvfredcxswqaz
poiuytrewqlkjhgfdsamnbvcxz
zxcvbnmasdfghjklqwertyuiop
qwertyuioplkjhgfdsazxcvbnm
1234567890qwertyuiop
mnbvcxzlkjhgfdsapoiuytrewq0987654321

[meta]
R74n / R74n.com "it's all thanks to the big R74n"
wordslop / wordslopping "can we stop adding 'slop' to every word?"
Sandboxels "where do pixels go after they get deleted?"
Infinite Chef "what slop will you cook up?"
GenTown "they must unlock wordslop"
ProtoCog / coglet "i bet your coglet doesn't know this many words"
Costoflivingdle
RageBait Simulator
Handwriting Personality
PixelFlags
R74moji "feel anything. be anyone."
word "if you like those, i have a game for you"
progress "you are doing great!"
unrecognized / recognized / not recognized "**^** was recognized"
total "+1 word"
stats "this probably added to one of them"
score "+10 points"
tries "try your best and you shall wordslop"
streak "this definitely helped yours!"
forms "these are your unique word spellings"
group / category / type "wordslop has a lot of these"
daily "words in the **DAILY GROUP** give double points!"
test "success!"
easter egg "it can't be that easy.."
mix-up / mixup / mix-up! "you like typing games?"
neal "sounds like a fun guy!"
halacae
rue "so you've met the other R74n project that talks back to you"
new / is new
submit "you can submit your words in the **unrecognized** tab!"
mute "but the sounds are so satisfying!"
rescue
comic sans "for legal reasons we use a slightly different font"
slop / sloppy "everything is slop these days, be the change you want to see"
megaslop / superslop / uberslop "it's impressive to even know what that is"
info "you're really trying everything now, aren't you?"
already said "**already said** was not already said"
synonym "also known as an **alias**"
alias "also known as an **synonym**"
news flash
canon "according to R74n lore, EVERYTHING is canon"
just type things "very true!!"
hint / help "u can click the hint button under stats or in a group!"
repeats "say that again"
something "very funny.."


### TODO

[cities]
las vegas / vegas
los angeles "also known as El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula"
chicago
düsseldorf
albuquerque
vancouver
newark
pittsburgh
miami

tahiti


[holidays]
halloween
birthday
easter
thanksgiving
carnival
sabbath / shabbat
passover

pixel
sprite / texture
autism
hyperfixation / hyperfixate / hyperfix
adhd
linux
ibuprofen
geek / nerd

[minerals]
# MAKE GEMSTONES A SUBSET
ore #list of ores
augite
gypsum
graphite
calcite
aragonite
asbestos / asbestus
silica
chalcopyrite
galena
mica / muscovite / isinglass
biotite


[compounds?]
= chemicals
sodium chloride "um actually dude, it's **salt**"
chloride
cyanide
kaolin / kaolinite (type of clay)
thermite
methane
ethane
propane
butane
aldehyde
ketone
ozone
titin
ammonia
deoxyribonucleic acid / dna
ribonucleic acid / rna
deuterium
tritium
lactose
protein
glucose
gluten
thymine
adenine
guanine
cytosine
uracil
phospholipid

[medicines]
Penicillin
Benzodiapezine
Salbutamol
Ibuprofen
Acetaminophen
Adderall
Midazolam
Aspirin
Naloxone
pepto-bismol
antihistamine

[microorganisms]
= animalcule / microbe
algae / alga / algal "this isn't a plant or fungus, but its own thing"
diatom
protist / protista
protozoan / protozoa
bacterium / bacteria
tardigrade / water bear / moss piglet
platelet
amoeba
bacteriophage
paramecium
euglena
chlamydomonas
plasmodium
yeast
mold / mould
e. coli / e coli
trypanosoma
copepod
ostracod
mitochondrion / mitochondria
virus
archaeon / archaea / archaean
slime mold / slime mould
cell
fungus / fungi

[programming]
= coding / development
ui
ux

[apples]

[phobias]
= fears
arachnophobia
aibohphobia
hippopotomonstrosesquippedaliophobia / hippopotomonstrosesquipedaliophobia

[seas]
[programming languages]
= computer languages

Greek Letters (alpha+unicode), Film Genres

[homophones]
"say both **homophone**s to complete their set!"
flower / flour

###

`;

function rescue(str) {
   let newWords = {"unknown":{}};
   let done = {};
   let popular = {};
   const lines = str.toLowerCase().split("\n");
   lines.forEach(line => {
      line = line.replace(/(^")|("$)/g, "").trim();
      let word = line.split(":")[0].trim();
      if (!word || word === "[word]") return;
      let group = line.match(/:.+/);
      if ((done[word] || newWords.unknown[word]) && !SPA.data.wordIndex[word]) {
         popular[word] = popular[word] || {};
         popular[word]._total = (popular[word]._total || 1) + 1;
         popular[word][(group ? group[0] : "unknown").replace(/(^: {0,})|\[|\]/g, "").trim()] = true;
      }
      if (!group || group === "[suggested group]") group = "unknown";
      else {
         group = group[0].replace(/(^: {0,})|\[|\]/g, "").trim();
         done[word] = true;
      }
      if (SPA.data.wordIndex[word] || SPA.data.wordIndex[word.replace(/\s/g, "")]) group = "duplicate";
      if (!newWords[group]) newWords[group] = {};
      newWords[group][word] = true;
   });

   delete newWords["suggested group"];
   delete newWords["duplicate"];

   let skip = {};
   for (const word in newWords.unknown) {
      if (done[word] === true || popular[word]) skip[word] = true;
   }
   let output = "[popular]\n";
   let popularList = Object.keys(popular);
   popularList.sort((a,b) => popular[b]._total - popular[a]._total);
   popularList.forEach(word => {
      let total = popular[word]._total;
      delete popular[word]._total;
      if (Object.keys(popular[word]).length > 1) delete popular[word].unknown;
      if (popular[word].unknown) return; //untested
      let list = Object.keys(popular[word]);
      output += "{" + total + "} " + word + " (" + list.join(", ") + ")";
      output += "\n";
      delete newWords[word];
   });
   output += "\n";
   for (const group in newWords) {
      output += `[${group}]\n`;
      output += Object.keys(newWords[group]).filter(w => skip[w] ? group !== "unknown" : true).join("\n");
      output += "\n\n";
   }

   console.log(output);
}