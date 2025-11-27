<?php
session_start();
if (!isset($_SESSION['admin'])) {
header('Location: login.php');
exit;
}


require '../database.php';
$result = $conn->query("SELECT * FROM reviews ORDER BY id DESC");
?>


<h2>Review Moderation Panel</h2>
<table border="1" cellpadding="10">
<tr>
<th>ID</th>
<th>Name</th>
<th>Rating</th>
<th>Message</th>
<th>Approved</th>
<th>Actions</th>
</tr>


<?php while ($row = $result->fetch_assoc()): ?>
<tr>
<td><?= $row['id'] ?></td>
<td><?= $row['name'] ?></td>
<td><?= $row['rating'] ?></td>
<td><?= $row['message'] ?></td>
<td><?= $row['approved'] ?></td>


<td>
<a href="approve.php?id=<?= $row['id'] ?>">Approve</a> |
<a href="delete.php?id=<?= $row['id'] ?>">Delete</a>
</td>
</tr>
<?php endwhile; ?>
</table>