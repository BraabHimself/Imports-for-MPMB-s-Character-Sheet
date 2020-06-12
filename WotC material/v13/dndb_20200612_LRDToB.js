var iFileName = "dndb_20200612_LRDToB.js";
RequiredSheetVersion(13);

// Define the source
SourceList.LRDToB={
	name : "Legends of Runeterra: Dark Tides of Bilgewater",
	abbreviation : "LRDToB",
	group : "Primary Sources",
	url : "https://www.dndbeyond.com/sources/lrdtob",
	date : "2020/06/12"
};

// Add the subclasses
AddSubClass("barbarian", "depths", {
	regExpSearch : /depths?/i,
	subname : "Path of the Depths",
	fullname : "Path of the Depths",
	attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	abilitySave : 1,
	source : ["LRDToB", 0],
	features : {
		"subclassfeature3" : {
			name : "Gift of the Drowned Ones",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["I have a swimming speed equal to my walking speed and can breathe underwater."]),
			eval : function () {
				SetProf("speed", true, { swim : { spd : 'walk', enc : 'walk' } }, "Gift of the Drowned Ones");
			},
			removeeval : function () {
				SetProf("speed", false, { swim : { spd : 'walk', enc : 'walk' } }, "Gift of the Drowned Ones");
			}
		},
		"subclassfeature3.1" : {
			name : "Dredge Line",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc([
				"When I rage, I manifest an extra magical appendage, such as a tentacle.",
				"I can use a bonus action to strike a creature within 15 with it",
				"It makes a DC 8 + prof + Str mod save or is pulled 10 ft straight towards me"
			]),
			action : ["bonus action", " (while raging)"]
		},
		"subclassfeature6" : {
			name : "Ghostwater Dive",
			source : ["LRDToB", 0],
			minlevel : 6,
			description : desc([
				"As an action, I can magically teleport to an unoccupied space I see within 30 ft",
				"Before or after teleporting I can make an attack as part of the action",
				"Moving in this way does not provoke opportunity attacks"
			]),
			action : ["action", ""]
		},
		"subclassfeature10" : {
			name : "Manifestations of the Deep",
			source : ["LRDToB", 0],
			minlevel : 10,
			description : desc(["Choose a Manifestation of the Deep using the \"Choose Feature\" button above"]),
			choices : ["Eyes of the Deep", "Arms of the Deep", "Heart of the Deep", "Soul of the Deep", "Armor of the Deep"],
			"eyes of the deep" : {
				name : "Eyes of the Deep",
				description : desc([
					"As an action I can use echolocation, casting True Sight without a spell slot or materials",
				]),
				action : ["action", ""],
				usages : 1,
				recovery : "short rest",
				spellcastingBonus : [{
					name : "Eyes of the Deep",
					spells : ["true seeing"],
					selection : ["true seeing"],
					oncesr : true
				}],
				spellChanges : {
					"true seeing" : {
						compMaterial : "",
						components : "V,S",
						range : "Self",
						description : "I gain truesight 120 ft; see through illusions, hidden doors, ethereal plane",
						changes : "Using Eyes of the Deep, I can cast True Seeing on myself without expending a spell lot and without material components."
					}
				}
			},
			"arms of the deep" : {
				name : "Arms of the Deep",
				description : desc([
					"When I rage, I now manifest two magical appendages",
					"When I use Dredge Line, I can attempt a grapple with each appendage"
				])
			},
			"heart of the deep" : {
				name : "Heart of the Deep",
				description : desc([
					"I can use a bonus action to give myself temporary HP",
				]),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""],
				additional : levels.map(function (n) { return n < 10 ? "" :  (12 + n) + " temp HP"; })
			},
			"soul of the deep" : {
				name : "Soul of the Deep",
				description : desc(["I am immune to being charmed and frightened"]),
				savetxt : { immune : ["charmed", "frightened"] }
			},
			"armor of the deep" : {
				name : "Armor of the Deep",
				description : desc(["My skin hardens granting +1 AC"]),
				eval : function () {
					AddACMisc(1, 'Armor of the Deep', 'The class feature Armor of the Deep gives a +1 bonus to AC');
				},
				removeeval : function () {
					AddACMisc(0, 'Armor of the Deep', 'The class feature Armor of the Deep gives a +1 bonus to AC');
				}
			}
		},
		"subclassfeature14" : {
			name : "Depth Charge",
			source : ["LRDToB", 0],
			minlevel : 14,
			description : desc([
				"When I use Ghostwater Dive, I can choose to appear with a wave of tidal force",
				"Creatures within 10 ft of the spot I appear in make a Strength save",
				"On a failure, they take 3d6 force damage and are knocked prone",
				"On a success, they take half damage and are not knocked prone"
			])
		}
	}
});

AddSubClass("fighter", "renegade", {
	regExpSearch : /renegade/i,
	subname : "Renegade",
	source : ["LRDToB", ],
	fullname : "Renegade",
	features : {
		"subclassfeature3" : {
			name : "Scoundrel’s Wit",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["I gain proficiency with two of the following skills: Deception, Persuasion, or Sleight of Hand"]),
			skillstxt : "\n\n" + toUni("Renegade") + ": Choose two from: Deception, Persuasion, or Sleight of Hand."
		},
		"subclassfeature3.1" : {
			name : "Gunfighter Form",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["Choose a Gunfighter Form using the \"Choose Feature\" button above"]),
			choices : ["Pistoleer", "Sniper"],
			"pistoleer" : {
				name : "Pistoleer",
				description : desc(["My firearm is a small flintlock handgun"]),
				weaponOptions : {
					regExpSearch : /pistoleer form$/i,
					name : "Pistoleer Form",
					source : ["LRDToB", 0],
					ability : 2,
					list : "ranged",
					type : "Martial",
					damage : [1, 6, "piercing"],
					range : "30 ft",
					abilitytodamage : true,
					ammo : "bullet",
					description : "Ammunition; 1 shot per attack"
				},
				weaponsAdd : ["Pistoleer Form"]
			},
			"sniper" : {
				name : "Sniper",
				description : desc(["My firearm is a large two-handed firearm"]),
				weaponOptions : {
					regExpSearch : /sniper form$/i,
					name : "Sniper Form",
					source : ["LRDToB", 0],
					ability : 2,
					list : "ranged",
					type : "Martial",
					damage : [1, 10, "piercing"],
					range : "120 ft",
					abilitytodamage : true,
					ammo : "bullet",
					description : "Ammunition, heavy, two-handed"
				},
				weaponsAdd : ["Sniper Form"]
			}
		},
		"subclassfeature7" : {
		},
		"subclassfeature10" : {
		},
		"subclassfeature15" : {
		},
		"subclassfeature18" : {
		}
	}
});