use std::io::{self, Read};

fn main() -> io::Result<()> {
  let mut input = String::new();
  let stdin = io::stdin();
  let mut handle = stdin.lock();

  handle.read_to_string(&mut input)?;

  let list: Vec<i32> = input
    .split("\n")
    .map(|x| x.parse::<i32>().unwrap())
    .map(|x| x / 3 - 2)
    .collect();
  
  let mut sum: i32 = 0;
  for value in list {
    sum += value;
  }

  println!("{}", sum);

  Ok(())
}
