using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace seleniumTest
{
    public class UnitTest1
    {
        private IWebDriver driver;

        [SetUp]
        public void Setup()
        {
            driver = new ChromeDriver();
        }

        [TearDown]
        public void Teardown()
        {
            if (driver != null)
            {
                driver.Quit();
                driver.Dispose(); // Explicitly dispose the driver
            }
        }

        [Test]
        public void SuccessfulLogin()
        {
            driver.Navigate().GoToUrl("https://demo.guru99.com/V1/index.php");
            driver.FindElement(By.Name("uid")).SendKeys("mngr581643");
            driver.FindElement(By.Name("password")).SendKeys("YnUvAga");
            driver.FindElement(By.Name("btnLogin")).Click();
            Assert.That(driver.Url, Does.Contain("Managerhomepage.php"));
        }

        [Test]
        public void FailedLogin()
        {
            driver.Navigate().GoToUrl("https://demo.guru99.com/V1/index.php");
            driver.FindElement(By.Name("uid")).SendKeys("invalidUsername");
            driver.FindElement(By.Name("password")).SendKeys("invalidPassword");
            driver.FindElement(By.Name("btnLogin")).Click();
            var alert = driver.SwitchTo().Alert();
            Assert.That(alert.Text, Is.EqualTo("User is not valid"));
            alert.Accept();
        }
    }
}
