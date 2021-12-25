export default class Channel {
  constructor(data, global) {
    this.global = global;
    this.name = data["display_name"] || "";
    this.emotes = this.getEmotes(data["emote_data"]);
    this.image = data["profile_image_url"];
    this.url = `https://twitch.tv/${this.name.toLowerCase()}`;
  }

  getEmotes(data) {
    //The requested channel might be invalid
    if (data === null) return data;
    return {
      tiers: this.processEmotes(data.data),
      template: data.template,
    };
  }
  /**
   *
   * @param {Array} emotes
   * @returns An object that is split into emote tiers
   */
  processEmotes(emotes) {
    //Some channels do not have any emotes (e.g. not a Twitch affiliate/partner)
    if (emotes.length === 0) return null;
    if (this.global) {
      return this.sortEmotes(emotes);
    } else {
      return this.sortEmotes(emotes).reduce((prevValue, currValue) => {
        //Group the emotes into their respective tiers
        prevValue[currValue.tier] = prevValue[currValue.tier] || [];
        prevValue[currValue.tier].push(currValue);
        return prevValue;
      }, Object.create(null));
    }
  }
  sortEmotes(emotes) {
    return emotes.sort((s1, s2) => {
      //Sort the emotes alphabetically and with characters first for globals
      const s1lower = s1.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const s2lower = s2.name.toLowerCase().replace(/[^a-z0-9]/g, "");
      return s1lower > s2lower ? 1 : s1lower < s2lower ? -1 : 0;
    });
  }
}
