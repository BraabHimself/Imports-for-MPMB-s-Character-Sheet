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
	abilitySave : 2,
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
			description : desc(["Choose a Gunfighter Firearm Form using the \"Choose Feature\" button above"]),
			choices : ["Pistoleer", "Sniper"],
			"pistoleer" : {
				name : "Pistoleer",
				description : desc(["My firearm is a small flintlock handgun"]),
				weaponOptions : {
					regExpSearch : /pistoleer firearm/i,
					name : "Pistoleer Firearm",
					source : ["LRDToB", 0],
					ability : 2,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [1, 6, "piercing"],
					range : "30 ft",
					abilitytodamage : true,
					ammo : "bullet",
					description : "Ammunition; 1 shot per attack"
				},
				weaponsAdd : ["Pistoleer Firearm"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isSpell && classes.known.fighter && classes.known.fighter.level >= 3 && (/pistoleer firearm/i).test(v.WeaponName) && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'pistoleer') {
								var atksNum = (classes.known.fighter.level < 5 ? 1 : classes.known.fighter.level < 11 ? 2 : classes.known.fighter.level < 20 ? 3 : 4);
								var shotStr = (classes.known.fighter.level < 5 ? "shot" : "shots");
								
								fields.Description = fields.Description.replace(/[0-9] shots?/i, atksNum + " " + shotStr);
							}
						},""
					]
				}
			},
			"sniper" : {
				name : "Sniper",
				description : desc(["My firearm is a large two-handed firearm"]),
				weaponOptions : {
					regExpSearch : /sniper firearm/i,
					name : "Sniper Firearm",
					source : ["LRDToB", 0],
					ability : 2,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [1, 10, "piercing"],
					range : "120 ft",
					abilitytodamage : true,
					ammo : "bullet",
					description : "Ammunition, heavy, two-handed"
				},
				weaponsAdd : ["Sniper Firearm"],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if ((!v.isSpell && classes.known.fighter && classes.known.fighter.level >= 3 && (/sniper firearm/i).test(v.WeaponName) && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper')) {
								output.die = output.die.replace('1d10', (classes.known.fighter.level < 5 ? 1 : classes.known.fighter.level < 11 ? 2 : classes.known.fighter.level < 20 ? 4 : 6) + 'd10');
							}
						}
					]
				}
			}
		},
		"weapon of choice minor" : {
			name : "Weapon of Choice (minor upgrades)",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["Use the \"Choose Feature\" to add minor fire arm upgrades to the third page"]),
			additional : levels.map(function (n) {
				return (n < 2 ? "" : (n <  5 ? 1 : 2)) + " minor upgrades";
			}),
			extraname : "Minor Firearm Upgrades",
			extrachoices : [
				"Blade and Black powder (prereq: Pistoleer Form)", "Caliber Net (prereq: Gunfighter Form)", "Collateral Damage (prereq: Sniper Form)", 
				"Crosshairs (prereq: level 5 fighter, Gunfighter Form)", "Double-Barrel (prereq: level 5 fighter, Sniper Form)", "Smoke Screen (prereq: Gunfighter Form)"
			],
			extraTimes : levels.map(function (n) {
				return n < 2 ? 0 : n < 5 ? 1 : 2;
			}),
			"blade and black powder (prereq: pistoleer form)" : {
				name : "Blade and Black Powder",
				description : desc([
					"Being within 5 ft of an enemy does not impose disadvantage on my Pistoleer firearm attacks",
					"I can use a bonus action to make a melee attack after shooting my Pistoleer firearm"
				]),
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'pistoleer'; },
				weaponOptions : {
					regExpSearch : /pistoleer blade/i,
					name : "Pistoleer Blade",
					source : ["LRDToB", 0],
					ability : 2,
					list : "melee",
					type : "Martial",
					isAlwaysProf : true,
					damage : [1, 6, "slashing"],
					range : "Melee",
					abilitytodamage : true
				},
				weaponsAdd : ["Pistoleer Blade"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isRangedWeapon && (/pistoleer firearm/i).test(v.WeaponName)) {
								fields.Description += (fields.Description ? '; ' : '') + "No disadv. when enemies within 5 ft";
							}
						}, ''
					]
				},
				eval : function () {
					processActions(true, "Blade and Black Powder", [["bonus action", " (after Pistoleer shot)"]], "Pistoleer Blade");
					processActions(false, "Blade and Black Powder", [["bonus action", " (after Pistoleer shot)"]], "Blade and Black Powder");
				},
				removeeval : function () {
					processActions(false, "Blade and Black Powder", [["bonus action", " (after Pistoleer shot)"]], "Pistoleer Blade");
				}
			},
			"caliber net (prereq: gunfighter form)" : {
				name : "Caliber Net",
				description : desc([
					"I can use an action to fire an arcane net at a creature within my Gunfighter firearm's range",
					"It makes a Strength save or is restrained; repeats save at end of each of its turns"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["action", ""],
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				weaponOptions : {
					regExpSearch : /caliber net/i,
					name : "Caliber Net",
					source : ["LRDToB", 0],
					ability : 2,
					dc : true,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					abilitytodamage : false,
					damage : [0, 0, ""],
					range : "",
					description : "Strength save or restrained"
				},
				weaponsAdd : ["Caliber Net"],
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/caliber net/i).test(v.WeaponName)) {
								fields.Range = ((GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper') ? "120" : "30") + " ft";
							}
						}, ''
					],
					atkCalc : [
						function (fields, v, output) {
							if (v.isRangedWeapon && (/caliber net/i).test(v.WeaponName)) {
								var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
								
								output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
							}
						},""
					]
				}
			},
			"collateral damage (prereq: sniper form)" : {
				name : "Collateral Damage",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper'; },
				description : desc(["On a Sniper firearm hit, creatures within 5 ft of the target make a Dexeterity save",
					"On a failure, they take 1d6 piercing damage"
				])
			},
			"crosshairs (prereq: level 5 fighter, gunfighter form)" : {
				name : "Crosshairs",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return classes.known.fighter.level >= 5 && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"Before moving, I can use a bonus action to aim down the sights of my Gunfighter firearm",
					"My speed becomes 0 and I gain adv. on all Gunfighter firearm attacks",
					"These effects last until the end of my turn"
				]),
				action : ["bonus action", " (before moving)"]
			},
			"double-barrel (prereq: level 5 fighter, sniper form)" : {
				name : "Double-Barrel",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return classes.known.fighter.level >= 5 && GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') == 'sniper'; },
				description : desc(["My Sniper firearm has 2 barrels; I can make 2 attacks per attack action with it"]),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if ((/sniper firearm/i).test(v.WeaponName)) {
								fields.Description += (fields.Description ? '; ' : '') + '2 shots per attack';
							}
						},"I've added a second barrel to my Sniper firearm, allowing me to make 2 attacks with it per attack action"
					]
				}
			},
			"smoke screen (prereq: gunfighter form)" : {
				name : "Smoke Screen",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"I can use an action to create a 10 ft cube cloud within my Gunfighter's firearm range",
					"The cloud spreads around corners, lasts 10 mins, and cannot be dispersed",
					"The area covered by the cloud is heavily obscured"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["action", ""]
			}
		},
		"weapon of choice major" : {
			name : "Weapon of Choice (major upgrades)",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc(["Use the \"Choose Feature\" to add major fire arm upgrades to the third page"]),
			additional : levels.map(function (n) {
				return (n < 2 ? "" : (n < 10 ? 1 : 2)) + " major upgrades";
			}),
			extraname : "Major Firearm Upgrades",
			extrachoices : ["Barrage (prereq: Gunfighter Form)", "Double Up (prereq: Gunfighter Form)", "Lightning Round (prereq: Gunfighter Form)", "Trial by Fire (prereq: Gunfighter Form)"],
			extraTimes : levels.map(function (n) {
				return n < 2 ? 0 : n < 10 ? 1 : 2;
			}),
			"barrage (prereq: gunfighter form)" : {
				name : "Barrage",
				description : desc([
					"As an action, I can force each creature in a 15 ft cone to make a Dexeterity save",
					"A creature takes 3d10 piercing damage on a failure, or half as much damage on a success"
				]),
				usages : 1,
				recovery : "short rest",
				action : ["action", ""],
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				weaponOptions : {
					regExpSearch : /barrage/i,
					name : "Barrage",
					source : ["LRDToB", 0],
					ability : 2,
					dc : true,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [3, 10, "piercing"],
					range : "15 ft cone",
					description : "Dex save; half damage on success"
				},
				weaponsAdd : ["Barrage"],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isRangedWeapon && (/barrage/i).test(v.WeaponName)) {
								var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
								
								output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
							}
						},""
					]
				}
			},
			"double up (prereq: gunfighter form)" : {
				name : "Double Up",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"On a Gunfighter firearm hit, I can hit another creature within 15 ft of the original target",
					"The creature takes piercing damage equal to my Dexeterity modifier"
				]),
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "short rest"
			},
			"lightning round (prereq: gunfighter form)" : {
				name : "Lightning Round",
				source : ["LRDToB", 0],
				prereqeval : function(v) { return GetFeatureChoice('class', 'fighter', 'subclassfeature3.1') != ''; },
				description : desc([
					"I can use an action to fire a bolt of electricity in a straight line",
					"The line is 1 ft wide and 30 ft long; creatures in the line make a Dex save",
					"A creature takes 3d8 lightning damage on a failure, or half as much damage on a success"
				]),
				weaponOptions : {
					regExpSearch : /lightning round/i,
					name : "Lightning Round",
					source : ["LRDToB", 0],
					ability : 2,
					dc : true,
					list : "ranged",
					type : "Martial",
					isAlwaysProf : true,
					damage : [3, 8, "lightning"],
					range : "30 ft line",
					description : "Dex save; half damage on success"
				},
				weaponsAdd : ["Lightning Round"],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isRangedWeapon && (/lightning round/i).test(v.WeaponName)) {
								var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
								
								output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
							}
						},""
					]
				},
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "short rest",
				action : ["action", ""]
			},
			"trial by fire (prereq: gunfighter form)" : {
				name : "Trial by Fire",
				source : ["LRDToB", 0],
				description : desc([
					"I can use a bonus action to charge my weapons fire",
					"On a hit, I deal extra fire damage equal to half your fighter level, rounded up"
				]),
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (!v.isSpell && (/\bcharged\b/i).test(v.WeaponText)) {
								output.extraDmg += Math.ceil(classes.known.fighter.level / 2);
							}
						},
						"If I include the word 'Charged' in a weapon's name or description, the calculation will add extra fire damage equal to half my fighter level, rounded up."
					]
				},
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "short rest",
				action : ["bonus action", ""]
			}
		},
		"subclassfeature7" : {
			name : "Cunning Shot",
			source : ["LRDToB", 0],
			minlevel : 7,
			description : desc(["My Gunfighter firearm attacks ignore damage resistances and immunities"]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if ((/sniper firearm/i).test(v.WeaponName) || (/pistoleer firearm/i).test(v.WeaponName) || (/lightning round/i).test(v.WeaponName) || (/barrage/i).test(v.WeaponName)) {
							fields.Description += (fields.Description ? '; ' : '') + 'ignores resistances/immunities';
						}
					},
					"My Gunfighter Firearm attacks ignore damage resistances and immunities."
				]
			}
		},
		"subclassfeature10" : {
			name : "Gring and Bear It",
			source : ["LRDToB", 0],
			minlevel : 10,
			description : desc(["My movement speed increases by 10 ft and I gain +1 AC when I use Second Wind"])
		},
		"subclassfeature15" : {
			name : "Right Gun for the Job",
			source : ["LRDToB", 0],
			minlevel : 15,
			description : desc(["After a long rest I can replace any Firearm Upgrade with a different one"])
		},
		"subclassfeature18" : {
			name : "Light 'Em Up",
			source : ["LRDToB", 0],
			minlevel : 18,
			description : desc([
				"As a bonus action I can throw or place an explosive",
				"When it is thrown, it explodes immediately on impact",
				"When it is placed, it can be detonated from up to 60 ft away as a bonus action",
				"When it explodes, creatures within a 15 ft radius make a Dexeterity save",
				"A creature takes 12d6 force damage on a failure, or half as much damage on a success"
			]),
			weaponOptions : {
				regExpSearch : /explosive/i,
				name : "Explosive",
				source : ["LRDToB", 0],
				ability : 2,
				dc : true,
				list : "ranged",
				type : "Martial",
				isAlwaysProf : true,
				abilitytodamage : false,
				damage : [12, 6, "force"],
				range : "30 ft",
				description : "Explodes in 15 ft radius \u2014 Dex save; half damage on success"
			},
			weaponsAdd : ["Explosive"],
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (v.isRangedWeapon && (/explosive/i).test(v.WeaponName)) {
							var fightingStyle = GetFeatureChoice('class', 'fighter', 'fighting style');
							
							output.extraHit -= (fightingStyle == 'archery' ? -2 : fightingStyle == 'close quarters shooter' ? -1 : 0);
						}
					},""
				]
			},
			usages : 1,
			action : [["bonus action", " (throw/place)"], ["bonus action", " (remote detonate)"]],
			recovery : "short rest"
		}
	}
});

AddSubClass("rogue", "wild card", {
	regExpSearch : /^(?=.*(rogue|miscreant))(?=.*wild card).*$/i,
	subname : "Wild Card",
	source : ["LRDToB", 0],
	features : {
		"subclassfeature3" : {
			name : "Tricks Up the Sleeve",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc([
				"I know the Guidance cantrip; at 9th level its range is 30 ft and can be cast using a bonus action"
			]),
			spellcastingBonus : {
				name : "Tricks Up the Sleeve",
				spells : ["guidance"],
				selection : ["guidance"],
				firstCol : "atwill"
			}
		},
		"subclassfeature3.1" : {
			name : "Wild Card's Gambit",
			source : ["LRDToB", 0],
			minlevel : 3,
			description : desc([
				"Choose dice set, dragonchess set, or playing card set with the \"Choose Feature\" button",
				"The gaming set chosen grants a Wild Card's Gambit",
				"I can change my Gambit choice whenever I gain a level in this class"
			])
		},
		"subclassfeature9" : {
			name : "Shifting the Odds",
			source : ["LRDToB", 0],
			minlevel : 9,
			description : desc([
				"As a bonus action I can teleport to an unoccupied space with 120 ft that I can see",
				"Creatures within 10 ft of the starting space make a Dex save (DC 8 + Cha mod + Prof bonus)",
				"A creature takes 4d10 force damage on a failure, or half as much damage on a success"
			]),
			action : ["bonus action", " (teleport)"],
			usages : 1,
			recovery : "short rest"
		},
		"subclassfeature13" : {
			name : "Twist of Fate",
			source : ["LRDToB", 0],
			minlevel : 13,
			description : desc([
				"I can swap initiative order after rolling initiative, but before the first turn",
				"I can swap with one creature I see; if its an ally they must agree to swap"
			])
		},
		"subclassfeature17" : {
			name : "Joker Wild",
			source : ["LRDToB", 0],
			minlevel : 17,
			description : desc([
				"As a bonus action I can assume an incorporeal form, granting the following benefits:",
				" \u2022 I regain all spent uses/dice of my Wild Card's Gambit feature",
				" \u2022 My movement speed is doubled and I am resitant to all damage",
				" \u2022 I am immune to the grappled, paralyzed, stunned, and restrained conditions",
				" \u2022 I can move through objects as if they were difficult terrain",
				"If I end my turn in a creature, it takes 1d0 force damage and is moved 5 ft",
				"This form last for 1 min or until I am incapacitated"
			]),
			usages : 1,
			recovery : "long rest",
			action : ["bonus action", ""]
		}
	}
});