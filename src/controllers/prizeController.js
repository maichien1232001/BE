const Prize = require("../models/Prize");
const UserStats = require("../models/UserStats");

exports.withdrawPrize = async (req, res) => {
  const { userId } = req.body;

  try {
    let prize = await Prize.findOne({ user_id: userId });

    if (!prize) {
      // Nếu chưa có Prize cho user, tạo mới
      prize = new Prize({ user_id: userId });
      await prize.save();
    }

    if (prize.count <= 0) {
      return res
        .status(400)
        .json({ message: "No more prize withdrawals allowed" });
    }

    // Tính toán ngẫu nhiên từ 100 đến 200 rồi nhân kết quả với 1000
    const randomValue = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    const deduction = randomValue * 1000;

    // Trừ giá trị tính toán từ amount
    const newAmount = prize.amount - deduction;

    // Cập nhật prize
    prize.amount = newAmount;
    prize.count -= 1;
    await prize.save();

    // Cập nhật UserStats
    await UserStats.updateOne(
      { user_id: userId },
      {
        $inc: {
          total_amount: deduction,
          withdraw_count: 1,
        },
      },
      { upsert: true } // Nếu chưa có UserStats thì tạo mới
    );

    res
      .status(200)
      .json({ message: "Prize withdrawn successfully", amount: newAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
