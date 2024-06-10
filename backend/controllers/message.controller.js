export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params.id;
    const senderId = req.params.userId;
  } catch (e) {
    console.log("Error in Send Message Controller", e.message);
    res.status(500).json({ error: "Internal Server ERROR" });
  }
};
