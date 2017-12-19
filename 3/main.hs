parse :: String -> Int
parse x = read x :: Int

disp :: Show a => a -> IO ()
disp = putStrLn . show

main = do
  input <- getContents

  let x = parse input
  -- abs(x) + abs(y) = x

  disp x