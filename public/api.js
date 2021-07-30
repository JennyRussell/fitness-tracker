const API = {
  async getLastExercise() {
    let res;
    try {
      res = await fetch("/api/exercises");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/exercises/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  async createExercise(data = {}) {
    const res = await fetch("/api/exercises", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getExercisesInRange() {
    const res = await fetch(`/api/exercises/range`);
    const json = await res.json();

    return json;
  },
};
