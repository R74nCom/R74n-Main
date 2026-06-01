/*
- search for found groups and words
- groups of the same completion percent are sorted alphabetically
- clicking a group name in the log scrolls to the newly-found word
- save file names include today's date and time
- words can be typed with accent marks even if dataset doesn't have them
- percent found and total words are shown in group view
- message for empty groups
- words can be clicked to repeat their blurbs
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
black
blonde / blond
blue
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
crimson
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
fuchsia
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
legion
community
series
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
bonk
boop
thunder
mumble
footstep "japan is turning these into electricity"
burp
wheeze
sob
clack
strum
pop
bang / bam / pow / boom / kaboom / blam
ching / cha-ching
chomp
choo / choo choo
clink / clank
ding
music
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
twang
vroom / room
yawn
zap
fah / fahh / fahhh / fahhhh / fahhhhh
whoosh / whooosh / whoooosh / whooooosh
pew
wham / whack
plop / plap

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
bugle
huff / puff / chuff
yiff
wail
pant
gulp
sniff / snuff / snuffle / sniffle
yowl
buzz / bzz / bzzt
call / sing / song
caterwaul
caw / cah
chatter / chitter
mimicry
cheep
chirp / chatterchirp
chuckle
cluck / click
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
meow / mew / miao / mreow / mrow / mrrp / nya / nyan
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
= basic
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
forth
same
moreover
extra
actually
most
least
moreso
again
only
also
gonna / finna
wanna
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
and / &&
another
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
could
did
didn't
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
something "very funny.."
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
ah / ahh / ahhh / ahhhh / aa / aaa / aah / aahh / aaah / aaahh / aaahhh
aha / ahah / ahaha / ahahah
alas
alright / aight
asap
aw / aww / awww / awwww / awh / awwh / awwwh / awhh / awwhh / awhhh
ay / aye
blah
bleh
bro / bruh / brah
btw
congratulations / congrats "for making the best game of the century?"
cool / rad / awesome / nice
damn / damnit / drat
dang / dangit
darn / darnit
dude
duh / duhh / duhhh
eh / ehh / ehhh / ehhhh
erm / ermm / ermmm
eureka
ew / eww / ewww / ewwww
for real / fr
gah
gg / good game
golly
good morning / gm "ready to start your day with wordslop?"
goodbye / bye / bye-bye "see u later"
goodnight / gn "sleep tight!"
gosh / goodness
guh / gwuh
gyatt / gyat
haha / ha / hah / hahah / hahaha
hehe / heh / heheh / hehehe / heehee
hello / hi / hey / greetings / aloha / hola / howdy / hai / haii / haiii / hallo / 'ello "hi there :)"
hm / hmm / hmmm / hmmmm
ho / hoho / hohoho
holy
hoohoo
hooray / hoorah
huh / huhh / huhhh
idc
idk / i don't know "if you need help, try using the **hint** button!"
ikr
jeez / gee
jk / just kidding "oh, okay! :)"
lmao / lmfao
lol / lul / lolz / lulz
mhm / mmhm / mhmm / mmhmm
mm / mmm / mmh / mmmh
ngl
no / nope / nah / nay / naw
oh / ohh / ohhh / ohhhh
oi / oy
okay / ok
omg / omfg / oh my god
omw
oof
ooh / oooh / ooooh / oo / ooo / oooo
oops / oopsie / oopsy
ow / ouch / owie / owch
please
pst / psst / pssst / pstt / psstt
r.i.p.
rofl
salutations
see you later / see u later "alligator"
shoot
sorry "it's okay, friend :)"
stfu
sure
tbh
teehee
thanks / thank you / thx "you're welcome!"
ugh / ughh / uggh / ugghh
uh / uhh / uhhh
um / umm / ummm / uhm / uhhm / uhmm
welcome
what's up / wassup / wazzup / waddup / 'sup "nothing much, you?"
whatever
woah
wow / wowza / waow
wtf / wth
yahoo
yay
yes / yep / ya / yeah / yup / si
yikes
yippee / yippie "YIPPEEEEE"
yo "yo"
yoohoo
yuck / yucky
yum / yummy / yummers
zzz / zzzz / mimi / mimimi / mimimimi "goodnight!"

[pronouns]
each other|he|her|hers|herself|him|himself|his|I|it|its|itself|me|mine|my|myself|one|oneself|our|ours|ourself|ourselves|she|thee|their|theirs|them / 'em / em|themself|themselves|there|they|thine|thou|thy|thyself|us|we|what|which|who|whom|whomst|whomst'd've / whomstdve|whose|y'all / yall|y'all's|you / u|your / ur|yours / urs|yourself / urself|yourselves / urselves|you're / u're / ure|they're|someone / somebody|everyone / everybody|nobody / no one|whoever / whomever|ye
ze|zir|xe|xim|xer|xem|zem|xis|xir|zer|xey|xyr|xyrs|xemself|zemself|xemselves|zemselves|zirself
fae|faer|faeself / faerself
this|that|these|those
ae|aer|aerself|aers
eir|eirs|emself
hir|hirs|hirself

[honorifics]
mr / mister
ms / miss
mrs / misses / missus
mistress
mademoiselle
mx
sir
dame
prof / professor
noble
reverend
dear
chancellor
esquire / esq
sire
maam / mam / madam / ma'am
dr / doctor / doc
lady / mlady / m'lady / ladyship
lord / lordship
honor / honour
majesty
highness
jr / junior
sr / senior
seniorita
gentleperson
gentleman
gentlewoman / gentlelady
master
the honourable / the honorable
messrs
excellency
rabbi
imam

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
peta-
tera-
re-
quad- / quant-
quint- / penta-
hex- / sex-
sept-
oct- / octo-
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
never
soon
when
whenever
o'clock
after
semester
epoch
eon
era
generation
period
moment
earlier
early
fortnight
future
hour
late
later
midnight
millennium / millennia
millisecond
minute
month
morning
nanosecond
night / nighttime
noon / midday
past
present / current / currently
season
second
week
year / annum
always
p.m.
a.m.
b.c. / b.c.e.
a.d.

[days]
sunday | monday | tuesday | wednesday | thursday | friday | saturday
weekend | weekday | yesterday | today | tomorrow | overmorrow

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
distal / outward / out / outside
dorsal
far
kata
near
palmar
port
proximal / inward / in / middle / center / centre / central / inside
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
accept
creep
access
achieve
acquire
act
activate
add
adhere
adjust
affect
age
agree
aim
allot
alter
amuse
annihilate
announce
annoy
answer
applaud
apply
approve
argue
arrange
arrive
ask
assert
assist
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
bathe
battle
be / been
beat / thrash / strike
beg
bend
berate
bicker
bid
bind
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
bluff
board
boast
bob
boil
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
bring
bristle
broach
broadcast
broil
brought
budget
build / construct
bump
bundle
burn
burst
bust
buy
call
care
carry
carve
catch
caution
celebrate
censor
challenge
change
charge
chat
check
chew
chime
choice
choke
chop / axe
chore
chuck
claim
clap
claw
clean
clear
climb
clip
close / shut
clot
clue
clump
coach
code / develop
collaborate / collab
collapse
collect
color / colour
combust
come / came
commission
compare
compel
complete / finish
condense
connect
consider
consume
contemplate
continue
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
crouch
cruise
crumble
crunch
crush
cry
curse
customize
cut / slice
damage
dance
dare
dash
daze
deal
debug
decay
decide
declare
decline
decouple
decrease
defeat
defend / defense / defence
define
delegate
delete
denominate
dent
deny
deploy
deposit
describe
deserve
desire
despair
despise
destroy / destruct / wreck
dial
dig
dip
direct
discard
discover
discuss
disguise
dislike
disrupt
distort
distract
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
drink
drive
drool
drop
drown
dug
dump
dunk
dye
eat / ate
edge
edit
email
emancipate
employ
empty
enamor / enamour
end
enjoy
enlighten
enslave
enter
eradicate
erase
errand
escape
estimate
etch
evacuate
evaluate
exchange
exclaim
execute
exercise
exfoliate
exhale
exit
expect
experiment
explain
explode
explore
extend
extinguish
fail
faint
fake
fall
fancy
farm
fasten
favour
feed
feel
fell
fend
fetch
fight / fought
fill
finance
find
fine
fire
fit
fitness
fix / repair
flake
flap
flash
flee
flex
flick
flip
flirt
flitter
float
flop
flow
fly / flew / flight
focus
fold
follow
force
forget
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
fuse
gag
gallop
gamble
game
gasp
generate
get / got / gotten
giggle
give / gave / given
glide
glow
gnash
go
gobble
grab / grip
grate
greet
grind
groom
grovel
grow / grown
growl / snarl
grumble
guess
gulp
haggle
haircut
halt
hammer
handle
happen
harm
harvest
haunt
heal
hear
heckle
help
hide
highlight
hike
hint
hire
hitch
hobby
hold
hollow
homework
hook
hop
hug
hunt
hurdle
hurry
hurt
idle
ignore
illuminate
imagine
imbue
imitate
impend
implode
impress
include
increase
indicate
indimidate
infect
infiltrate
inflame
inform
inhale
inject
insert
insist
inspire
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
jiggle
jive
join
joke
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
lend
license / licence
lick
lie / lying
lift
light / lit
limp
linger
link
list
listen
load
loan
locate
look
loop
lose
lost
lunge
lure
make / made
manage
mangle
manufacture
march
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
milk
mimic / mimicking
mince
mine
minus / subtract
misspell / mispell
mix
mock
model
morph
mortgage
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
need
needs
nibble
nod
notify
nurture
obey
obfuscate
objectify
objection
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
override
owe
own
pacify
paint
pant
parry
part
pass / surpass
paste
pat
patch
pause
pay
payback
pee / urinate
peek
peel
perform
pet
pick
picture
ping
pitch
pivot
place
plan
play
plead
pluck
poison
poke
ponder
poop / poo / shit / crap / defecate
possess
pour
power
practice
prance
prank / mischief
pray / prayer
preach
predict
press
pretend
print
produce
project
promise
promote
pronk
protect
protest
prove
prowl
pry
pull
punch / hit
punish
purchase
pursue / pursuit
push
put
quench
quest / adventure / journey
question
quit
raise
rally
ramble
rant
reach
react
reaction
read
realize
reap
reboot
receive
reckon
recognize
recon / reconnaissance
recover
redo
reel
refresh
refund
refuse
regenerate
relate
relay
remember
remove
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
reveal
revenge
revive
rewind
rid
ride
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
saw
say / speak / talk / communicate / tell / converse / conversation / speech / said
scam
scan
scare
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
set
settle
sever
sew
shag
shake
share
shave
shed
shiver
shop
shorten
shot
shout
shove
show / present
shred
sign
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
slide
slip
slit
slither
slouch
slur
smash
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
spray
spread
spy
squat
squeeze
stab
stack
stalk
stamp
stand
stare
start / begin
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
stutter
subject
submit
subscribe
suck
sue
suggest
summon
surround
swallow
swap
swat
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
tend
testimony
think
thought
throw
thump
tickle
tiff
time
tire
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
trick
trigger
trip
trump
try
tug
tumble
turn
tussle
twirl
twist
twitch
undo
unfasten
unfollow
unload
unpack
unsubscribe
update
upgrade
upvote
urge
use
vacate
vacation
vandalize / vandalism
vape
verse
video
view
visit
vote
wail
wait
waive
wake / awake / awaken / awoken
walk / step
wander
want
warp
wash
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
work
worship
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
colossal
compact
deep
diminutive
enormous
epic
fast
fat / fatty
gargantuan
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
heptadecagon
paraloboid
hyperboloid
enneadecagon
centigon
chevron
circle / round
cone
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
fractal
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
line
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
flatworm / flat worm / planarian / planaria / tapeworm / cestode
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
babirusa
buffalo "'Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo' is a valid English sentence"
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
pronghorn
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
rabbit / bunny / bnnuy "rabbits only blink 10-15 times in an hour"
raccoon / racoon / trash panda
red panda "red pandas are technically not pandas, nor bears!"
reindeer / caribou
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
walrus
warthog
weasel
marten
pika
wildebeest / gnu
wolverine
yak
zebu
binturong / bearcat "the bearcat is not a bear, nor a cat"
dimetrodon

[cats]
= cat / feline / kitty / kitten / felid / big cat / bigcat / gato / pussy / pussycat / neko
"good kitty!"
abyssinian
bicolor / bicolour / harlequin
jaguarundi
kodkod / güiña
bengal
birman
bobcat / bobkitten
ragamuffin
bombay
calico
caracal / floppa "it's big floppa!"
cheetah
cougar / mountain lion
himalayan
jaguar
leopard
lion / lionness / leo "pretty much all lions live in **Africa**"
longhair
lynx
maine coon
mau
ocelot / ozelot
oncilla / tiger cat / tigrillo
pallas's cat / pallas cat / pallas
panther / pantheress
persian
puma
ragdoll
russian blue
saber-toothed tiger / smilodon / saber-toothed cat / saber-tooth / sabertooth
sand cat
serval
shorthair
siamese
snow leopard
sphynx "these cats are known for their lack of fur"
tabby
tiger / tigress "their skin is also striped, much like their fur"
tortoiseshell
turkish van
wildcat


[bears]
= ursids
black bear / black
brown bear / brown / kodiak bear / kodiak
grizzly bear / grizzly
panda / panda bear / giant panda
polar bear / polar
sloth bear / indian bear
spectacled bear / andean bear
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
barbado
barbet
basenji
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
daschund
africanis
xoloitzcuintle / xoloitzcuintli / xoloitzquintle / hairless dog / xolo
vizsla
dalmatian
dalmation
dhole
dingo
dire wolf
dobermann pinscher / pinscher / doberman pinscher / doberman
doodle
fennec fox
fox / vixen "the **Scandinavian red fox** has the scientific name 'Vulpes vulpes vulpes'"
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
sennunhund
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
hamster
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
takhi
zebra
onager / hemione
eohippus
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
human / homo sapiens / person / people / man / men / woman / women "that's us!"
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
kangaroo / wallaroo / joey "kangaroos can't jump backwards.. they also can't walk at all"
koala / drop bear "these marsupials have a very specific diet of poisonous leaves"
numbat / noombat / walpurti
opossum
possum
quokka
quoll
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
caenolstid / rat opossum
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
anhinga
ani
auk
avocet
awlbill
cyrilavis
sungrebe
kagu / cagou
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
woodnypmh
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
alligator "see you later!"
amphisbaenian / worm lizard
anaconda
anole
asp
tuatara
adder
basilisk
boa / constrictor
goanna
whiptail
caiman
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
terrapin / water tortoise / pond turtle / pond slider
tortoise
turtle
urutu / pit viper
viper
egg-eater / egg-eating snake
mamba
taipan "one bite of the venomous **inland taipan** could kill 250,000 mice"
titanoboa

[dinosaurs]
= dinosaur / dino
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
peeper
mudpuppy
salamander
spadefoot / spadefoot toad
tadpole / polliwog / pollywog "baby amphibians go through **metamorphosis**, most famously seen in frog tadpoles"
toad
tree frog
pobblebonk "didn't think that was real, huh?"
rainfrog

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
barb
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
ray / stingray / manta ray
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
tang
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
gladiator
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
silverfish
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
vinegaroon
wolf spider
widow
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
shrimp / prawn "the **peacock mantis shrimp**'s punch is so strong that it boils the water around it"
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
tsidiiyazhi
longmornis
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
bonnacon
kitsune
babi ngepet
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
giant
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
leviathan
loch ness / nessie
manticore
mermaid / merman
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
sea serpent / serpent
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
coal
shell / seashell
silt
den
sediment
lichen
deoxyribonucleic acid / dna
diarrhea
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
mound
mud
nest
pee / urine / piss / peepee
peel
pinecone / cone
poop / poo / poopy / crap / shit / dookie / poopie / doodoo / guano / feces / faeces / turd "very mature.."
ribonucleic acid / rna
roe / caviar
root
rust / rusty
sand "you could make a game out of this.."
sap
seaweed
slime / goo
snow / snowflake
stick / twig / branch "one of the many things that can break bones"
blossom
bud
petal
pistil
stem
boll
stump
vomit / puke / throwup / barf
snot / booger
log
water "is it wet? who can say.."
wax / beeswax
web / cobweb

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
= flora / brush
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
flax
boxelder
cotton
sugarcane / cane
peyote
moss
reed
wheatgrass
flytrap
pitcher plant
hedge
xanthium / cocklebur
liverwort
duckweed
grass "touch this instead of typing words all day"
cereal / grain
wheat
tumbleweed
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

[flowers]
"awww, you got this for me?"
abutilon
aconite
agapanthus
ageratum
alchemilla
allium
st. john's-wort
alstroemeria
trollius
mallow
nightshade
marshmallow
uva ursi / barberry
bouganvillea
paulownia
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
bird of paradise
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
snowdrop
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
cashew "did you know that cashews come from a fruit?"
aratiles
araza
avocado
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
cranberry
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
plumcot
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

azuki bean / azuki
pepper / chili
bean
cucumber
eggplant / aubergine
jalapeño
habanero
carolina reaper
olive
pea
pumpkin
gourd
squash
tomato
courgette / zucchini

[vegetables]
= veggies / veggie
"remember to eat your greens!"
azuki bean / azuki
pepper / chili
bean
cucumber
eggplant / aubergine
jalapeño
habanero
carolina reaper
ginseng
olive
pea
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
brussels sprouts / brussel sprout / brussels
butter bean
butternut squash
cabbage
carrot
cassava
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
mushroom / fungus
mustard greens
navy bean
nettle
oca
okra
onion
onion sprout
paprika
parsnip
peas
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
spaghetti squash
spinach
split pea
squashes
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
cassia
catnip
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
rigatoni
mochi
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
walnut

[trees]
acacia
applewood / apple
alder
arborvitae / thuja
ash
rowan
kukui / candlenut
aspen
azalea
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
evergreen
baobab
laurel
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
cutlet
flank
carnitas
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
nugget
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
wheat
oats
barley
sorghum
rice
millet
rye
quinoa
buckwheat
afghan
anpan
bacon
bagel
baguette
banh mi
batter
bibimbap
big mac
biltong
biryani
biscuit
borscht
couscous
souvlaki
custard
pudding
bread / bun / loaf / roll
breakfast
brie
broth
brownie
brunch
bruschetta
burrito
butter
cake
calzone
candy / sweet
casserole
cereal
ceviche
cheese
cheesecake
chia
chimichanga
chips
chocolate
chop suey
chow mein
cobbler
cookie
cracker
creamsicle
croissant
crumb
crust
cupcake
curry
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
enchilada
fajita
falafel
flour
fries "put the words in the bag lil bro"
fritter
froyo / frozen yogurt
garam masala
gelatin / jell-o
gelato
gimbap
gingerbread
gnocchi
gochujang
goldfish
granola
guacamole / guac
gum "selling chewing gum is illegal in Singapore"
gummy
gyro / wrap
hummus
ice cream
jeon
jerky
kebab / kabob / kebap
kimchi
lasagna
lays
lo mein
lollipop / lollypop / lolly
lunch
macaron
macaroni
macaroon
mandu
marshmallow "they are named after the flower originally used to make them"
meringue
mirin
monte carlo
muffin
mulligatawny
naan
nacho
nasi goreng
noodle
nougat
nugget
omelette / omelet
omurice
oreo
pad thai
pancake
panini
pasta
pastry
pho
pickle
pie
pizza / za
popcorn
popsicle
poptart
pretzel
pringle
pumpkin seed
quesadilla
quiche
ramen
ramyeon
ravioli
risotto
s'more
salad
saltine
sandwich / sub
scone
seaweed / gim
shawarma
sherbet
snack / treat
sorbet
soup
spaghetti
stew
stroopwafel
strudel
supper
sushi
taco
tamale
taquito
tart
tater tot
tiramisu
toast
tofu
tortilla
trail mix
tteokbokki
wafer
waffle
whopper
wonton
yeast
yogurt / yoghurt / yogourt / yoghourt

[cheeses]
american
asiago
pecorino
whey
blue / bleu
bocconcini
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
halloumi
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
mustard
ketchup
chimichurri
mayochup
relish
barbecue / bbq / barbeque
dip
worcestershire
icing
marinara
ranch
honey
dressing
oil
bolognese
sauce
syrup
gravy / grease
mayonnaise / mayo
caramel
hot sauce
coleslaw
jelly
jam
preserve
soy / soy sauce / soya / soya sauce / teriyaki

[drinks]
= beverages / liquids
absinthe
alcohol
alcopop
ale
americano
potion
shirley temple
arnold palmer
beer
capri sun
snapple
mojito
bellini
fireball
oj
bloody mary
7up
boba / bubble tea
bourbon
brandy
cappuccino
chai
champagne
red bull
chartreuse
cider
cocktail
coffee / caffè
cognac
corona
cosmopolitan
cream
dr pepper / doctor pepper
eggnog
energy drink
espresso
fanta
fresca
gatorade / powerade
gin
ginger ale
granita
grenadine
grimace shake
horchata
hot chocolate / hot cocoa
hug
ipa
juice
kombucha
lager
latte
lemonade
limeade
liqueur
liquor / spirit
midori
curaçao
spritzer
affogato
scotch
sarsaparilla
sherry
kahlúa
macchiato
mai tai
malt
margarita
martini
matcha
mead
milk
milkshake / shake
mimosa
mocha
mocktail
monster
nectar
noni
paloma
pepsi
pilk
piña colada
pog
prime
punch
rum
sake
sattu
slushie / slushy / slush / slurpee
smoothie
soda / cola / coke / pop / soft drink
soju
sparkling water / seltzer
sprite
tea
tepache
tequila
tonic
vodka
water / h2o
whiskey / whisky
wine

[media]
application / app / software
art
blog
book
comic
billboard
commercial / advertisement / ad
concert
flyer
game / video game
script
audio
hashtag
gif
play / screenplay
opinion
editorial
cartoon
anime
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
poem
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
musical
baroque
bluegrass
blues
bossa nova
breakcore
c-pop
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
psychedelia
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
vaporwave
vocaloid / utauloid / utau / miku / hatsune miku / miku hatsune / hatsune / teto / kasane teto / teto kasane / kasane

[accessories]
= fashion
& clothing
& footwear
amulet
anklet
armor
beanie
leash
belt
beret
brimhat
boa
lace
bow / bowtie
rosary
bracelet
braces
brooch / broach
buckle
burqa
button
cane
cap
chainmail
chain
charm
chestplate
choker
collar
crown / tiara
cuff
earbuds / earphones / airpods
earmuffs
earring / piercing
fedora
fez
gaiter
garter
girdle
glasses / eyeglasses / brille
glove
goggles
handbag / purse / pocketbook
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
lapel
lei
locket
loincloth
mask / facemask
medal / medallion
mitten
mitt
monocle
muffler
neckerchief
necklace
necktie
pad
pendant
pin
pocket
pocketwatch
ribbon
ring
scarf
shoelace
sleeve
snorkel
sombrero
stilt
sun hat
sunglasses
suspenders
thong
tie
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
bloomers
blouse
bra / brassiere
breech
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
pinafore
polo
poncho
pullover
qipao / qi pao / cheongsam
raincoat / rain jacket
robe
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
underwear / panties / panty / boxers / briefs / undergarment / tights / pantyhose / underpants
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
vans
buskin
cleat
clog
croc
flip-flop
galosh
heely / roller
high heel / high-heel
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
baseball
basketball
shot put
croquet
gymnastics
bowling
pato
boxing
juggling
canoeing
caber toss
capoeira
cheerleading / cheer
chess
climbing
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
hockey
hopscotch
horseback riding / equestrian / horse racing / horses
jai alai
jiu jitsu
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
motorsport / cars / motor racing / motor
muay thai
netball
olympics
parasailing
pentathlon
pickleball
ping pong
pole vaulting
rafting
rowing
rugby
running / racing / race / run
silat
skating / skateboarding
skiing
snowboarding
soccer / association football / fútbol
softball
squash
surfing
swimming
table tennis
taekwondo
tag
tennis
volleyball
wakeboarding
water polo / polo
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
shot
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
goal / basket / net
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
flatbed
lifeboat
infiniti
dodge
suzuki
fiat
mazda
miata
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
sled
sleigh
snowmobile
spaceship / rocket
steamroller / roller
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
shaker
autoharp
concertina
turntable
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
tam-tam
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
gong
guitar
guitarrón guitarron
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
maracas
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
ac / air conditioner
afghan
alarm / siren
amphora
anchor
antenna / antennae
anvil
scale
domino
churn
whetstone
mannequin
appliance
armchair
atlas
tava / tawa
backpack
bouquet
bag
balloon
bandage / dressing / bandaid / gauze
basket
bassinet / stroller / pram
bath / bathtub / tub
battery
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
bookshelf
boombox
bottle
bowl
boxcutter
bread knife
broom
broomstick
brush
bucket / pail
butter knife
cabinet
cage
calculator / calc
calendar
camera
candle
candlestick
canvas
card
carpet / rug
carton
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
charger
check
checkbook
chopsticks
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
computer / pc
conditioner
console / xbox / playstation / ps5
controller
cookiecutter
cooler
corer
cork
corkscrew
cot
couch
counter / countertop
cover
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
deodorant
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
figure / figurine
fireplace
fixture
flag
flashlight
flask
floor
flyswatter / swatter
folder
footstool / footrest
fork
frame
freezer
fridge / refrigerator
frier
furniture / furnishing
futon
gallon
gameboy
gauge
gavel
glass / cup
globe
goblet
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
heater
highlighter
hinge
hoe
holder
hose
house plant
ink
iron
jar
jenga
joystick
jug
jukebox
keg
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
laptop
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
lock
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
mantle
map
marker
mascara
mat / placemat
match / matchstick
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
notebook
ointment
opener
origami
ornament
ottoman
outlet
oven
page
pager / beeper
painting
pan
paper / document
peeler
pen
pencil
perfume
pestle
phone / telephone
photo / photograph / picture
pickaxe
pill
pillow
pillowcase
pin / pushpin / tack / thumbtack
pint
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
rack
radiator
radio
rag
rake
razor / shaver
razor blade
recliner
record
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
ruler
sack
safe
sandpaper
saucepan
saw
scanner / copier / photocopier
scissors / shears
sconce
screwdriver
shampoo
sharpener
shelf
shoebox
shovel
shower
showerhead
sign
sill / windowsill
silverware / utensil
sink / basin / washbasin
skillet
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
stapler
step / stair
stepladder / step stool
stereo
sticker
stool / barstool
stopwatch
stove / stovetop / cooktop
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
teacup
teapot
teaspoon
telescope
television / tv / telly
tenderizer
thermometer
thermos
thermostat
thesaurus
tile
timer
tissue
toaster
toaster oven
toilet
tongs
tool
toothbrush
toothpaste
toothpick
top / spinner
towel
toy
trapdoor
trash can / dustbin / garbage can / garbage bin
tray
typewriter
uno
urn
vacuum / hoover
vanity
vape
vase / pottery
vat
vcr
vent
vhs player
vice
walkie-talkie
wall
wallet
wallpaper
wardrobe
washboard
washcloth
washing machine / the wash
whisk
whiteboard
wick
windchime
window
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
parchment
tile
bronze
cardboard
tar
cashmere
cement
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
paper
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
wood / lumber
wool

adamantite
mythril

[structures]
= buildings
airport
apartment / flats
aquarium
aqueduct
pulpit
arcade
attic
courthouse / court
aquifer
automated teller machine / atm
confessional
sandbox
avenue
portal
backyard
bakery
pigsty
balcony
ballroom
bank
bar / pub
barbershop
barn
barracks
basilica
bastion
bathroom / restroom
souk / suq
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
deck
den
diner
dock / pier
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
highway / freeway / interstate
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
institution
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
mosque
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
pillar
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
road / street / way / boulevard / lane / alley / alleyway / roadway / route
sidewalk / pavement / footpath
rollercoaster
room
roundabout / rotary / traffic circle
ruins / wreck
salon
satellite
scarecrow
school
sentry
sewer
shed
shelter
silo
site
skyscraper
slide
stadium
stage
stall
station
statue
stonehenge
stoplight
store / shop / mart
suburb
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
tower
town
track
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
workshop
yard
zone
zoo
condo
scaffold / gallows
maze
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
ak-47 / ak47
anthrax
ar-15 / ar15
arrow
artillery
axe / ax
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
blowgun
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
club
colt
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
nuke
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
sai
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
taser
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
acne / pimple
adenoid
afro
alveolar ridge
alveolus
septum
pore
glute / gluteal
frenulum
amygdala
tracheole
stinger
fringe
bangs
elytra
ankle
antenna / antennae
tusk "this is actually an elongated tooth"
mane
hoof
lap
antler
aorta
appendix "this organ has no use to modern humans"
arch
arm
armpit
artery
auricle / pinna
back
backhair
beak / bill
beard
belly / tummy
biceps
bladder
blood
bone
bowel
braid
brain / mind
brainstem
breast / boob / tit / titty / teet / mammary / booby
bronchi
bronchiole
bronchus
bruise
butt / ass / butthole / buttocks / anus / bum / arse / asshole / rear
calf
canal
canine
capillary
carpals
cartilage
cavity "please take care of your teeth"
cell "you have about thirty-six trillion of these"
cerebellum
cerebrum
cervix
chamber
cheek "no other animal can blush like us"
chelidon / elbowpit / cubital fossa / wagina / cough-into
chest
chin
circulation
clavicle
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
diaphragm
dimple
dorsal fin / dorsal
duodenum
ear
eardrum
earlobe "we aren't sure what the purpose of them is"
ears
elbow
enamel
epidermis
epiglottis
esophagus / oesophagus / throat / maw
eye / eyeball
eyebag
eyebrow / brow
eyelash / lash
eyelid
face
fallopian tube
false vocal cords
fang
fat
feather
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
frontal lobe
funny bone "it's actually a **nerve**"
gallbladder
gill
gland
glottis
goosebump "every mammal gets these!"
gullet
gums
gut
hair
hairline
hamstring
hand
head
heart "yours will beat more than three billion times in your life"
heel
hip
hippocampus
humerus
hyoid
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
laryngopharynx / hypopharynx
larynx
latissimus / lateral / lats
leg
lens
ligament
limb
lipid
lips "some of the most sensitive parts of the body"
liver
lobe
loin / crotch / groin
lumbar
lungs
lunula
lymph node / lymph
malleus
mandible
mantle
marrow
medulla
melanin
membrane
metacarpal
metatarsal
mohawk
molar
mouth / frown
mullet
muscle "this word comes from latin for **little mouse**"
mustache / moustache
nail / toenail / fingernail
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
occipital lobe
organ
oropharynx
ossicle
ovary
palate
palm
pancreas
parietal lobe
patella
paw
pectoral / pecs
pelvis
penis / cock / dick / dih / peepee
phalanges
pharynx
philtrum
pinky
placenta
pons
pouch
premolar
privates
proboscis
prostate
pube
pubis
pulse
pupil
quadriceps
radius
rectum
retina
ribs / ribcage "these could be fractured if you sneeze too hard. be careful!"
rod
sacrum
saliva
scab
scale
scalp
scapula
scar
sclera
shell
shin
shoulder
shoulder blade
side
sideburn
skeleton
skin "this is your largest organ"
skull / cranium
snout / muzzle
socket
sole
sperm / semen
sphincter
spine / spinal cord / spinal column / spinal / backbone
spleen
sternum
stirrup / stapes
stomach
sweat
tail
tailbone
talon
tarsal
tear
tear duct
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
tooth / teeth / smile "yours are just as strong as a **shark**'s!"
torso
trachea
triceps
trunk
tumor
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
vertebra
vessel
vocal cords
voicebox
vulva / vulvae
waist
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
golgi apparatus / golgi bodies / golgi / apparatus
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
woronin bodies

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
drizzle
drought / dry / arid
dust storm / dust devil / sand whirl
earthquake
eruption
firenado / fire whirl
firestorm
flood / flooding / surge / storm surge
fog / foggy
frost
gale
graupel
hail / hailstorm
haze
heat wave
hot / heat
humid / muggy / moist / moisture / damp / soggy
hurricane / typhoon
ice / icy
landslide
lightning
mist / misty
monsoon
mudslide
overcast
rain / rainy / rainstorm / rain storm / wet
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
sunny / sun / clear
thunder / thunderstorm
tide
tornado / twister
tsunami
warm
waterspout
wildfire / smoke / smoky
wind / windy / windstorm / gust

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
sinkhole
boulder
archipelago
bluff
cape
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
cliff
continent
dune
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
ravine
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
bay
bayou
bank
beach
inlet
wadi
oxbow
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
coast
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
lake
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
bog / bogland
desert
field
forest / woodland
moor / barren
reef
grassland
arid
jungle
temperate
mangrove
ice cap
tropics / tropical
chaparral
meadow
aquatic
alpine
mesa
arctic
siberia / siberian
sahara / saharan
plains
polar
prairie
rainforest
savanna / savannah
scrub
shrubland
swamp
taiga
tunda
tundra
wetland

[buzzwords]
5g
agike
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
archeology
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
archaeology
astrology
architecture
archiving / archive / preservation
arithmetic
astrobiology
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
literature / writing
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
paleontology
pathology
pediatrics
pharmacology / medicine / drugs
phenomenology
philology
philosophy
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
algebra / algebraic
algorithm / algorism
slope
sequence
repetition "repetition"
interval
modulo / modulus
euler
pythagorean / pythagoras
arccosecant
segment
arccosine
arccotangent
arcsecant
arcsine
arctangent
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
cardinal
chord
circumference
coefficient
composite
concentric
congruent
constant
coordinate / coord
cosecant / cosec
cosine / cos
cotangent / cotan
decimal
decrement
denary
denominator
derivative / deriving
determinant
diameter
difference
digit
dimension
distributive
dividend
division / dividing
divisor
eigenvalue
equal / equality
equation
equilateral
even
exponent / exponential / power
expression
factor
factorial
finite
formula
fractal
fraction
frequency
function / fn
geometry / geometric
graph
greater than
gross
height
homeomorphism
hypotenuse
imaginary
increment
inequality
infinitesimal
infinity / infinite / ∞
integer
integral / integration
intersecting
inverse
irrational
isosceles
length
less than
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
perfect
perimeter
permutation
perpendicular
pi / 3.14 / π / 3.14159 / 3.1415 / 3.141
point
polynomial
positive
prime
probability
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
range
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
theorem
trace
trigonometry / trigonometric / trig
undefined
union
variable
vector
vertex
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
ton / tonne
angstrom
quart
fermi
micron
twip
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
rod / pole / perch
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
millennium
litre
teaspoon
tablespoon
cup
gallon
electronvolt
dalton
grain
carat
gram
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
ampere
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
positron
proton
quark
tau

[companies]
= brands
7-eleven / 7-11 / seven-eleven
abc
acer
adidas
agricole
vaio
asda
dreamworks
sainsbury's
aldi
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
Anheuser-Busch / busch
anthropic
apple "former apple CEO Steve Jobs would only eat apples and carrots for weeks at a time"
arby's
astrazeneca
asus
at&t / att
atari
audi
audible
axa
b&h / bhp
backbone
bank of america / bofa
bbc
berkshire hathaway
bic
blackrock
bmo
bmw
bnp
bp
broadcom
buc-ee's
bugatti
burger king
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
disney
dole
dollar general
dollar tree
domino's
doordash
ea
elevance
eli lilly
enel
enron
expo
exxonmobil / mobil / exxon
fandom
ferrari
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
instagram "follow us on instagram @R74ndev!"
whatsapp
intel
intesa sanpaolo
johnson & johnson / j&j
jpmorganchase / jpmorgan / chase
kellogg
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
mcdonald's
mediawiki / wikipedia
mercedes-benz / mercedes
meta / facebook
micro center
micron
microsoft / microslop "more like microSLOP!"
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
tiktok / bytedance "follow us on tiktok @R74n.com!"
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
indian
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
alliance / union
anarchy / anarchist
aristocracy / aristocrat / aristocratic
authoritarianism / authoritarian
border
representative / MP
abolishment
bureaucracy / bureaucrat / bureaucratic
capitalism / capitalist
veto
corporatocracy
liberalism / liberal
conservatism / conservative
empire
ecclesiocracy
capital / capitol
centrism / centrist
court / judicial / judiciary
judge
healthcare
socialization / socialized
subsidy / subsidization / subsidize
colony / colonial / colonist
communism / communist / commie / tankie
confederation / confederate
constitution / constitutional
democracy / democratic
democrat
despotism / despot
dictatorship / dictator / totalitarianism / totalitarian
distributism
election / voting / voter / elected
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
nationalism / nationalist
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

[countries]
"to make everyone happy, we are using the loosest definition of **country**"
abkhazia
afghanistan
albania
rome / roman empire
algeria "in the 1850s, the US army imported camels from ^"
american samoa
Curaçao
andorra
babylonia / babylon
assyria
Molossia
us virgin islands / virgin islands
british virgin islands / uk virgin islands
pitcairn islands
saint helena, ascension, and tristan da cunha / saint helena / ascension / tristan da cunha
angola
saint pierre and miquelon / st. pierre and miquelon
anguilla
antigua and barbuda / antigua / barbuda
argentina "although argentina is famous for soccer, its national sport is **pato**"
armenia
aruba
australia / au / aus "australia is wider than the moon, at 4000 kilometers from east to west"
czechoslovakia
austria / austrian empire
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
china / prc "despite being about the width of the US, china has only one time zone"
colombia
comoros
congo / drc / democratic republic of the congo
cook islands
costa rica
côte d'ivoire / cote d'ivoire / ivory coast
croatia
cuba
cyprus
czech republic / czech / czechia
denmark
djibouti
dominica
dominican republic
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
french polynesia
gabon
gambia
gaza strip
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
hong kong
hungary / magyar
iceland "iceland has no standing army"
india / bharat "^ is credited as the birthplace of chess, shampoo, and the concept of 0"
indonesia
iran / persia "although **Tehran** is the current capital, ^ has had as many as 54 national capitals"
iraq
ireland "the only country to have an instrument - the celtic harp - as its national symbol"
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
new zealand / zealand "the first country to grant women the right to vote"
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
palestine
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
saint kitts and nevis / saint kitts / nevis / st. kitts and nevis / st. kitts
saint lucia / st. lucia
saint vincent and the grenadines / st. vincent and the grenadines
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
trinidad and tobago
tunisia
turkey / türkiye
turkmenistan
turks and caicos islands
tuvalu "much of this island nation's revenue comes from selling **.tv** domains"
uganda
ukraine
united arab emirates / uae
united kingdom / uk / britain / british
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
western sahara
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
saint george's / st. george's
saint john's / st. john's
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
st. paul / saint paul
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
akan
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
avar
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
dargwa
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
egyptian
elamite
english
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
french
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
ilocano
iloko
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
lezgin
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
mandarin / chinese
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
mongolian
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
sardnian
scots
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
spanish
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

[religions]
= beliefs
agnosticism / agnostic
anglicanism / anglican
atheism / atheist
bahá'í / baháí
baptist
buddhism
Calvinism
cao dai
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
taoism
tenrikyo
thelema
unitarianism / unitarian
vodou / voodoo / vaudou / vodun / vodoun / vodu / vaudoux
wicca
zoroastrianism

[common names]
aaron
abigail / abby / abbie
adam
adhara
ailany
alan
alanna / alana
albert / al
alexander / alejandro / alex / alexandria / alexandra / alexis / alexei / alexa
alice
alma
amanda / amy
amber / ambar
amelia / emilia / emilio / emiliano
ana / annie / anne / an / anita / annette / anika / annika
andrew / andy / andie / andre / andrea / andrey / andreas
angela
anthony / antonio / antonella
arthur
ashley / lee
aurora
ava
barbara
benício
benjamin / ben
bernardo / bernard
betty / betsy
beverly
bradley / brad
brandon
brenda
brian / bryan
brittany / britney / brittney / brittani / brittanie or britnee
bruce
bruno
caitlin / catelynn / caitlyn / katlyn / kaitlin / kaitlyn / kaitlyne / katelyn / katelynn
caleb / kaleb
cameron / cam
camila
carl / karl / carlson / karlson
carol / karol / carolyn / caroline / carolina
catalina
catherine / katherine / kathy / kathie / kathleen / kathryn / kate / katie / kayla
cecilia
celeste / celestia
charles / charlie
charlotte
cheryl
christopher / chris / christ / christina / christine / christie / christy
cynthia
daniel / dan / danny / danielle
davi
david
deborah / debra / debbie / debby
denise
dennis
diane / diana / dianna
donald / don / donnie / donny
donna
dorothy
douglas / doug
dylan
edward / ed / eddie / eddy
elijah / eli
elizabeth / lizabeth / eliza / lisa / liz / lizz / lisha
ellie / eliana / elly
elsie / elsa
emma / emily
emmanuel / manuel
enzo
eric / ericson
ethan
evelyn / eve
felipe
francis / francesca / francesco / frank / frankie / franky / fran / françois
freya
gabriel / gabe
gabriela / gabrielle / gabby
gary / garret / garrett
george / georgia
gerald
giovanni / gio
gloria
gregory / greg
hannah / hanna
harrison / harold / harry
hazel
heitor
helen
helena
heloísa
henry / henrietta
hugo
isaac
isabella / isabela / izzy / bella / belle
isla
ivy
jack / jackie / jacky / jay / jacques / jacqueline
jacob / jakob
james / jim / jimmy
janet
janice
jason / jase / jace
jeffrey / jeff
jennifer / jenny / jennie / jenna
jeremiah / jeremy
jerome / jerónimo / jerry
jesse / jessie / jessica / jess
joaquin / joachim
jonathon / john / johnny / joan / juan / johanna / joanna / joanne / jean / jeanne / jana / jo
jose
joseph / joe / josephine
joshua / josh
joyce
judas / jude / judah / judith / judy / judie
julia / juliet / julieta / julio / julian / juliana / julie
justin
keith
kelly
kenneth / kenny / ken
kevin
kimberly
kyle / kylie
larry
laura / lauren / lori / lorraine
lawrence
leonard / leonardo / leo / leon
levi
liam
lily / lilly / lilian / lillian
linda
logan
lola
lorenzo
luca
lucas / luke
luciana / lucia
lynn
maitê
margaret / maggie
maria / marie / mary / marilyn
martha
martin / martina
matthew / matt / matteo / mateo / matías
megan / meagan
melissa
mia
michael / mike
michelle / mitchel / mitchell
miguel
mila
muhammad / mohamet / mohammed / mahamad / muhamad / mohamed
nancy
natalie / nat
nathan
nicholas / nick / nicky / nickie / nicolas / nicole / nichole
noah
nora / norah
olivia / oliver
pamela
patrick / pat / patricia / pattie / patty
paul
peter / pete
poppy
rachel
randy / randall
ravi
raymond / ray
rebecca / becky / becca
regina
richard / rich / richie / richy / dick
robert / rob / bobby / bob
romina
ronald / ron / ronnie / ronny
ruth
ryan
salvador
samuel / samantha / sam / sammy
sandra / cassandra
sarah / sara
scott / scottie / scotty
sean
sebastian / seb
sharon
shirley
sienna
sophia / sofia
steven / stephen / steve / stevie / stephanie / stefanie
susan / sussan / sussanne
teresa / theresa / terry
theodore / theo
thiago / tiago / santiago
thomas / tom / tommy
tiffany / tiff
timothy / timothee / tim / timmy
tracy
tyler
valentino / valentine / valentina
valeria
vega
victoria / vicky / vick
vincent / vince
violet
walter / walt
wayne
william / will / bill / billy / willie / willow
zachary / zach

[money]
= currency / cash / coin / bill / banknote / dinero / currencies / change
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
cent / penny
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
euro
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
pound / pound sterling / quid
pula
quetzal
rand
real
renminbi / yuan
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
yen
złoty / zloty
nickel
quarter
dime "this coin has exactly 118 ridges around its edge"

[jobs]
= occupations / workers / laborers / positions / employment / employee / staff / faculty
accountant
ace
acrobat
activist
actor / actress
acupuncturist
administrator / admin
admiral
advisor
aedile
aesthetician
swimmer
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
attorney
auctioneer
auditor
author / writer
aviator
babysitter
baker
ballerina
banker / teller
bard
barista
baron / baroness
bartender / barkeep
bassist
beekeeper
beggar / vagabond / hobo
biologist
bishop
blacksmith
bodybuilder
bodyguard
boss / employer
botanist
bouncer
boxer
breeder
brigadier
broadcaster
builder / construction worker
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
cashier / clerk
celebrity / superstar
ceo
cfo
chaplain
chef / cook
chemist
chief / chieftain / chieftess
chiropractor
cleaner
cleric
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
cosmetologist
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
driver
druid
drummer
drycleaner
duce
duchess / duke
earl
ecologist
economist
editor
electrician
emir
emperor
empress
engineer
entertainer
escort
eunuch
executioner
executive
explorer
exterminator
farmer / farmhand
farrier
fighter
firefighter / fireman / firewoman
fisher / fisherman / fisherwoman
florist
fortune teller / psychic
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
human resources
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
investor
jailer / bailiff
janitor / custodian
jester / muse
jockey
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
paleontologist
paperboy
paralegal
paramedic
parole officer
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
poet / poetess
police / cop / policeman / policewoman / officer / popo
politician
pope / pontifex maximus
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
professor / teacher
programmer / developer / coder / gamedev
prosecutor
prospector
prostitute / hooker
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
researcher
ringleader
rockstar
rogue
royal
sailor
saint
sales / salesman / saleswoman / salesperson
samurai
scientist
scout
scriptwriter / playwright
sculptor
secretary
senator
sergeant
servant
server / waiter / waitress / waitstaff
sheriff
shogun
singer
slave
smith
soldier / military
sommelier / chef de vin / wine steward
songwriter / composer
sorcerer / sorceress / witch / wizard / warlock / mage
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
tailor / seamstress
tanner
taxonomist
technician
terrorist
therapist
trader / merchant / tradie / tradesman
trainer
trucker
trumpeter
tsar / czar
tutor
typist
umpire
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
youtuber / content creator
zookeeper
zoologist

[family]
= relatives / relationships / household
adult
aunt / aunty / auntie
baby
boyfriend / bf
brother / bro
brother-in-law
child / kid / children / adolescent / minor / offspring
male / boy / man / guy / dude / lad
female / girl / woman / dudette / gal
child-in-law
cousin
neighbor
toddler / tot
dad / father / papa / pa / daddy / dada
daughter
daughter-in-law
enbyfriend
ex
father-in-law
fiancé
fiancée
firstborn / eldest
friend / colleague / buddy
girlfriend / gf
grandchild / grandchildren / grandkid
granddaughter
grandfather / grandpa
grandmother / grandma / granny
grandparent / elder
grandson
half-brother
half-sibling
half-sister
husband
in-law
joyfriend
mom / mother / mama / ma / mommy / mum
mother-in-law
nephew
nibling
niece
parent
partner / mate
pet
quadruplet
quintuplet
septuplet
sextuplet
octuplet
sibling / sib
sister / sis
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
teenager / teen
triplet
tweenager / tween
twin
uncle
wife

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
time
rover
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
trition
triton
umbriel
varda
vesta
hygiea

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
auriga
big dipper
boötes
caelum
camelopardis
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
ursa major
ursa minor
vela
virgo
volans
vulpecula

[mythological gods]
= deities / gods
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
gaea / ge / tellus / terra mater / terra / mother earth
hades / pluto / dis
hebe / juventas / iuventas
helios / sol
hephaistos / hephaestus / vulcan
hera / juno / iuno
hermes / mercury
hestia / vesta
janus
loki
nike
pan / faunus
persephone / cora / kore / proserpina
poseidon / neptune / neptunus
rhea / rheia / kybele / ops
selene / luna
uranus / caelum
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
set
nephthys
anubis
horus
ra / rah

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
chromium
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
oganesson
ununennium
unbinilium
neutronium

[states of matter]
= state of matter
solid
liquid / fluid
gas / vapor
plasma
bose einstein
fermionic
superfluid
supersolid
degenerate
supercritical fluid / scf


[morbidities]
= morbid
& weapons
addiction / addict
adultery
alcohol / alcoholic / alcoholism
alzheimer's / dementia
arson
arthritis
assault / hurt / abuse
asthma
avarice
awful
mourning
snot / booger
curse / hex
homelessness / homeless / unhoused
disorder
sacrifice
r.i.p.
bad / evil / terrible / horrible
battle
beating / thrashing
bigotry / racism / homophobia / transphobia / sexism / misogyny / xenophobia
blackjack
carnage
casket / coffin
cemetery / graveyard
chaos
cheating / cheater
cigar
cigarette
cocaine
coma / comatose
conspiracy
corpse / carcass
danger / dangerous
corruption / corrupted / corrupt
covid-19 / covid / coronavirus / corona
malaria
creepy / scary / eerie
crime / criminal
cyclops
darkness / dark / shadow
death / die / dying / dead / fatality / fatal
lsd
demon / devil / imp
depression / depressed
deviancy
dictator / fascist
dictatorship / fascism
dirty / filthy / filth
disease / virus / plague / sickness / ailment / sick / illness / ill / infection / infected / germ
dismemberment / dismember
dread
drugs
dumb / stupid
dust
envy / envious / jealousy / jealous
explosion / explode / blast
famine
fart / brap
fentanyl / fent
fight
fool / idiot / bozo / doofus / numbskull / loser / twat / dumbass / noob
funeral
gambling / gamble
genocide
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
larceny
lie
lobotomy
lust / lustful
massacre
mean / rude
methamphetamine / meth
misery / suffering
misinformation / disinformation / misinfo / disinfo
monster
morphine
mort / micromort
mortality / mortal
murder / kill / killing / manslaughter / slaughter / homicide
nicotine
nightmare
opioid
parasite / parasitic / parasitism
pestilence
plutonium
poison / poisonous / toxin / toxic
poker
pollution
predator / predation / predate
pride / hubris
cannibalism / cannibal
radioactivity / radioactive / radiation
decay / decayed / rot / rotting / rotten / rotted
sad / sadness
salmonella
satan / lucifer
satyr
sin
skeleton
slavery
sloth
sludge
spaghettification
stinky / smelly / gross / disgusting / nasty / stink
suicide
fratricide
sororicide
matricide
patricide
assassination / assassinating / assassin
scurvy
regicide
asphyxiation / choking
tetanus
zika
prion
mold / mould / moldy / mouldy
taboo
terrorist / terrorism
theft / stealing / thief
tobacco
torture
trash / junk / garbage / debris
twisted
tyrant
ugly
uranium
vain
vampire / dracula
vandalism / vandal
violence / violent
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
ethereal
reincarnation / reincarnate
celebration
favorite / favourite
fact
strength / strong
enlightenment
nirvana
archangel
miracle / blessing
heaven
victory / win
revolution
power
angel
creativity
fortune / luck / lucky / fortunate
privilege
love
sleep
laughter / laugh
cure / vaccine
clean / hygiene
good / great
holy / apocryphal
nice / kind
morality / moral
savior
hero
peace / peaceful / pacifist
beauty / beautiful / pretty / handsome
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
best
gorgeous
honest
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
= feelings / moods / emotional
admiration / admire / admiring
aggression / aggressive / aggressiveness
alert
amazed / amazing / amaze / awe
anger / angry / furious / irate / mad / rage / wrath
hangry
annoyed / annoying / annoy / annoyance / indignant
aloof / removed / distant
anxiety / anxious / worry / worried / nervous / nerve
concern / concerned
apprehension / apprehensive
curiousity / curious / wonder
approval
aroused / arousal
serious
joking / unserious
disappointment / disappointed
confidence / confident
sassy
amusement / amused
hype / hyped
comfort / comfortable
discomfort / uncomfortable
elated
melancholy
brave / fearless
tired / exhausted / sleepy / eepy
bored / boredom / ennui
calm / mellow / chill
nostalgia / nostalgic
acceptance
lachrymose / lachrymosity
jolly / festive
insanity / insane
hate / hatred / hateful "HATE. LET ME TELL YOU HOW MUCH I'VE COME TO HATE YOU SINCE I BEGAN TO LIVE"
schadenfreude
pleasure
shy
inspired / inspiration
ecstasy
denial
embarrassment / embarrassed / embarrass / shame / shameful / shamed / flustered / flushed
confused / confusion
passion / passionate
dizzy / dizziness
contempt
content
neutral
delighted / delight / delightful
depression / depressed
disapproval
disgust / disgusted
disinterest / disinterested
dissatisfied
distracted / distraction
agony / pain / painful / ache / anguish
hurt / offended / offense
extinction
distrust
dread
ecstatic
envy / envious / jealousy / jealous
excited
fear / scared / terrified / terror / scary / trembling / fearful / horrified
gloomy
grateful / thankful
grief / grieving
guilt / guilty
hope / hopeful / optimistic / optimist / optimism
faith / faithful
interest / interested
joy / happy / joyful / happiness / gleeful / glee / glad / gay / joyous
loathe / loathing / loathed
love
miserable
panic / panicked / panicking
peace / peaceful
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
shock / shocked / stunned / surprise / surprised
astonishment
misery / suffering
sorrow
stressed / stress / stressful / tense / distress / distressed
trust
understanding
valence
vigilance / ready / readiness / vigilant

[lgbtq+]
= sexuality / gender / sex / identity / lgbt / lgbtq / lgbtqi / lgbtqia / lgbtqia+ / glbt / lgb
a-spec
abroromantic
abrosexual / abro
achillean
aegoromantic
aegosexual
afab
agender
alloromantic
allosexual / allo
ally
amab
androgyne / androgynous / androgyny
androromantic
androsexual
aporagender
aromantic / aro / aroace
asexual / ace
bicurious
bigender
bisexual / bi
butch
masc
ceteroromantic
ceterosexual
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
estrogen
fa'afafine
femboy
femme
fujoshi
gay / homosexual / mlm
genderfluid
genderflux
genderqueer
grayromantic / greyromantic
graysexual / greysexual
gyneromantic
gynesexual / gynoromantic
intersex
lesbian / wlw
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
transfem / transfeminine / trans girl / trans woman
transgender / trans / transitioning / transsexual
transmasc / transmasculine / trans boy / trans guy / trans man
trigender
trixic
twink
two-spirit / 2-spirit
xenogender
yaoi
yuri


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
phi / φ / golden ratio
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

[letters] q|w|e|r|t|y|u|i|o|p|a|s|d|f|g|h|j|k|l|z|x|c|v|b|n|m
á|å|ä|à|ã|æ|ç|é|ë|è|ï|ñ|ó|ö|õ|ø|ß|ü|µ|œ|ú|í|â|ā|ē|ī|ō|ū|ê|ô|ò|ù|û|ń|ǎ|ă|ą|ć
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
delta / δ
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
sigma / σ
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

[video games]
a hat in time
akinator
balatro
baldi's basics / baldi "collect my noteboos"
banban
bendy / ink machine
binding of isaac / isaac
bornana "is that even a real fruit?"
celeste
danganronpa
deadlock
don't starve
doom
elder scrolls / skyrim
fnaf / five nights at freddy's / fazbear "or or or or or"
forsaken
fortnite "number one victory royale!"
genshin impact / genshin
geometry dash / gd "holy gd reference"
god of war / ragnarok
grace
grand theft auto / gta
half-life
hollow knight / silksong
honkai star rail / honkai
kirby
last of us
lobotomy corporation / lobotomy corp
mario / luigi / wario / waluigi "it's-a-me!"
minecraft / steve / herobrine "i am typing words and stuff cus i am playing wordslop"
mouthwashing
omori "waiting for something to happen?"
osu! / osu
overwatch
payday
persona
pizza tower
pokémon / pikachu
red dead redemption / red dead / rdr
roblox "oof"
sonic / sanic "gotta go fast!"
splatoon / inkling "woomy!"
terraria "also try **minecraft**"
tetris
ultrakill / v1
umamusume
undertale / deltarune / sans / papyrus / jevil / togore
valorant
witcher
zelda / link

[fandoms]
anime
manga
attack on titan
marvel
star wars
sanrio
world of gumball / tawog
lord of the rings / lotr
lorax / onceler
thomas the tank engine
octonauts
furry
weezer
avatar
countryballs / planetballs / companyballs / polandball
bluey
star trek
doctor who
supernatural
homestuck
sherlock holmes
naruto
dragon ball / goku
inuyasha
evangelion / neon genesis
cowboy bebop
akira
death note
sailor moon
berserk
my hero academia / mha
madoka magica / magical girls
utena / revolutionary girl
jujutsu kaisen / jjk
chainsaw man
stranger things
arcane
helluva boss
murder drones
bts
blackpink
stray kids
itzy
illit
xlov
limbus company
aespa
le sserafim
nmixx
newjeans
ateez
i-dle
kiiikiii
hearts2hearts
babymonster
xg
harry potter
horizon
bfdi / battle for dream island / bfb / tpot / object shows / yoyle / yoylecake / yoyleland / bfdie
ten words of wisdom / twow / eleven words of wisdom / ewow
cuphead
pingu "noot noot"
demon slayer
jojo's / jojo / jojo's bizarre adventure / joestar "yare yare daze.."
dnd / d&d
friday night funkin' / fnf
hazbin hotel / hazbin "can we NOT talk about that right now?!"
hellsing
invincible / omniman "are you sure?"
katseye "gnarly.."
gameoverse
the owl house / toh
knights of guinevere
loona "stan loona"
one piece
twice
spongebob "i'm ready!"
the boys / homelander / starlight "excuse me sir"
amazing digital circus / digital circus / tadc / pomni / jax / kinger / ragatha / caine / zooble

[memes]
& funny numbers
accurate hitboxes "is it possible?"
ahh
nene "watch me whip"
alpha / beta / omega
among us / amogus / sussy / sus / crewmate / imposter / impostor
aura / aurafarming "wordslopping gives a huge aura boost"
baby gronk / livvy dunne
pibble "rub my belly!"
bazooka "rip granny"
clippy "be like clippy"
forever alone
clipping "chat clip that"
hyperpigmentation "no.. it's nice"
sparta
girl dinner
rage face
lunchly "i like my cheese drippy bruh"
bonesmashing
ea-nāṣir "refund me NOW!"
kid named finger "who names their kid that?"
updog "what's updog?"
chuck testa
chuck norris
noice
derp
bnnuy
computa "computa give this guy a new word"
chezburger "can i have pls"
emotional damage
technologia
coffin dance
popcat
jackpot
xd / xdd / xddd / xdddd
we're playing bendy "so that's why"
my sunshine / lebron "my only sunshine"
backrooms
ballerina cappucina
ball knowledge
address me / elephant in the room
baka
big chungus / chungus
pmo
bīng qí lín / bing chilling
blud
bober
maxxing / maxing
boi
bomboclat / mi bombo "MI BOMBO-"
brainrot
brr patapim / brr batipim
bruh "this is a bruh moment"
bussin'
calc "is that slang?"
cap / no cap / capping "on god?"
chat "chat let's go wordslop"
chicken jockey / crafting table / water bucket / the nether
chill guy "my new oc"
chipi chipi chapa chapa "dubi dubi daba daba"
chopped
chud "act like a chud"
chuzz
cinema "absolute.. CINEMA"
clanker
clavicular / clav
coco "i didn't even know a **^** went to our school"
cook / cooking
cooked
cope / copium
copypasta
cornball
cortisol "wordslop players have low cortisol levels"
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
diddy / diddyblud
dih
baby boo "she don't call me"
nonchalant "literally me when wordslopping at work.."
doge "so word very wow"
domer
doomscrolling / doomscroll
driving in my car / after a beer / asgore
dubai chocolate
enshittification "everything is turning to **slop**.."
epstein
excuse me sir "there must be someone you've confused me for"
f students "also known as **the inventors**"
fah / fahh / fahhh / fahhhh / fahhhhh / faaa
fanum / fanum tax "half of your words belong to me"
fih
floater "it's a **^**!"
flop
foid
forgor "i forgor 💀"
freakbob "would you pick up?"
freaky "𝓱𝓮𝓵𝓵𝓸 𝓫𝓻𝓸 ❤️"
friendslop "wordslop can be friendslop too"
funni
gaslight
gatekeep
geeked
gem alert / gemerald
get in the car / isn't the car
gigachad
girlboss
glazing / glazer
gnarly
goat / goated "wordslop is goated"
golden dandelion
goofy
goon / gooning / gooner / jestergooning
no-scope
illuminati "coincidence? i think not"
skill issue
griddy
grimace shake
gurt "yo"
gyatt / gyat
hantavirus "not again.."
harambe
hat man / benadryl
hawk tuah / tuah "spit on that thing!"
huzz
iceman "i am iceman man i am iceman man"
jeff
job / jobless "can you censor that next time?"
job application "AHHHHH!"
john cena "why did you enter a blank word?"
john pork "will you answer his call?"
jumpscare "AHHHHH!"
just walk around "well, it depends on the stud count"
kai cenat
caseoh
kappa "everybody spam Kappa in the chat"
kawaii
kendrick / kendrick lamar
keyboard cat
kirk / kirkenuinely / lowkirk / lowkirkenuinely / kirkify / kirkified / kirkification / kirky
L "L for sLop"
labubu
larp / larping / larper "we, yes WE, are larping wordslop"
ligma "what is that??"
lil bro "lil bro is wordslopping"
lobotomy
lolcat
lolcow
looksmax / looksmaxx / looksmaxxing / looksmaxing / looksmaxxer / looksmaxer
loss / is this loss "|| |||| |||| ||_"
low taper fade "it's still massive"
lowkenuinely
lowkey / highkey / lowk
tiktokification
mafiabob
mcqueen "kachow!"
mew / mewing
minion
mlg "MOM GET THE CAMERA"
mogged / mogging / mog / framemog
monke
morbius / morbillion / morbin' "HOW many tickets?!"
mustard "mustaaaaard"
niche
npc
nyan cat "nyannyannyannyan nyannyannyannyannyan nyannyan"
obamium "finally"
ohio "only in ohio"
ong
oof
owo "what's this?"
pepe / peepo
perchance
pingas
pluh "pluh!"
pog / pogchamp / poggers
pookie
property in egypt "what they do for you is, they give you the property"
quandale dingle
ragebait "grrrrrr!!!!!"
rah
retro / retroslop
rickroll "we're no strangers to love"
rizz / the rizzler
road work "i sure hope it does!"
roflcopter
sanic
scientology "go go go!"
scp
scuba "that cat's got moves!"
sdiybt "ME?"
shrek
sigma "did you know sigma is a Greek letter, too?"
sisyphus "sisyphus but instead of a boulder he types words all day"
skibidi
slay
slenderman "collect my words"
slop
smurf cat "we live we love we lie"
soyjak / soyjack
speed / ishowspeed / kinda homeless / kind of homeless / i need this
speedrun "how fast can you beat this category?"
steamed hams "**wordslop**? at this time of year? at this time of day?"
stonks "$SLOPCOIN TO THE MOON"
strawberry elephant "bro that's a rare brainrot"
swag
sybau / syfm "not nice!"
the big 26 / the big 25 / the big 2026
the game "you just lost the game (not really, keep playing!)"
tiki tiki
tralalero / tralala / tralalelo
troll / trollface
trolley problem
ts
tuff "ts is so tuff"
tung tung / tung / sahur / triple t
unc
uwu "hai~"
vro
W "W for wordslop"
wojak
woke "the woke left? without saying goodbye?"
yap / yapping
yeet
your mom / ur mom "leave her alone!"
ytp / youtube poop
yummers
zamn
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
hippopotomonstrosesquippedaliophobia / hippopotomonstrosesquipedaliophobia "what does that mean AHHHHHHH"
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
affix
suffix
backronym
uppercase / capital / capitalized
lowercase
capitonym
collective noun
conjunction
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
homophone
intensifier
interjection
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
typo / misspelling / mispelling
verb

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
windows
fn / function
ctrl / control
alt / option
cmd / command
prtsc / prtscn / print screen
backspace / delete / del
spacebar / space
enter / return
arrow
scroll lock
num lock
page up
page down
insert
f1 / f2 / f3 / f4 / f5 / f6 / f7 / f8 / f9 / f10 / f11 / f12
numpad
dvorak
plokmijnuhbygvtfcrdxeszwaq
zxcv
uiop
ghjkl
vbnm
sksk / sksksk / sksksksk
zaqwsxcderfvbgtyhnmjuiklop
zaqxswcdevfrbgtnhymjukilop
polikujmyhntgbrfvedcwsxqaz
polkiujmnhytgbvfredcxswqaz
poiuytrewqlkjhgfdsamnbvcxz
zxcvbnmasdfghjklqwertyuiop
qwertyuioplkjhgfdsazxcvbnm

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
mix-up / mixup "you like typing games?"
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


### TODO

[cities]
las vegas / vegas
los angeles "also known as El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula"
chicago

tahiti


[holidays]
halloween
birthday
easter
thanksgiving
carnival
Sabbath / Shabbat
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
augite, gypsum, graphite, calcite, aragonite, asbestos / asbestus
silica

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
titin
ammonia
deoxyribonucleic acid / dna
ribonucleic acid / rna
deuterium
tritium
lactose
protein

[apples]

[fungi]
= fungus
mushroom
shiitake
mold
lichen "lichens are actually part-**algae** and part-fungus"
cordyceps
amanita

[flavors]
= flavours / tastes
sweet
salty
umami
sour
mild
strong

[phobias]
= fears
arachnophobia
aibohphobia
hippopotomonstrosesquippedaliophobia / hippopotomonstrosesquipedaliophobia

[seas]
[programming languages]
= computer languages

Greek Letters (alpha+unicode), Film Genres

[symbols]
= punctuation, special characters
period / .
semicolon / ;
asterisk / *
‽ (interrobang)
⸮ (irony mark)
§ (section sign)
¶ (pilcrow)
№ (numero sign)
∴ (therefore)
∵ (because)
ℵ (aleph)
⌘ (command key symbol)
⌀ (diameter sign)

king, queen, bishop, and knight

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